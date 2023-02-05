const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, ActiveUser } = require("../models/user/userModel");
const { loginSchema } = require("../models/user/userSchema");
const debug = require("debug")("authentication");
require("dotenv").config();

const handleLogin = async (req, res) => {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    // if the username and password match
    // using -> await bcrypt.compare(password, {password})
    // then send a jwt token along with a refresh token
    try {
        // check to see if the user is in the database
        const users = await User.find({ email: value.email });
        if (users.length === 0)
            return res.status(401).json({ message: "Invalid email or password." });
        const u = users[0];
        // verify that the passwords match
        const match = await bcrypt.compare(value.password, u.password);
        if (match) {
            debug("Passwords Match!");
            const { firstName, lastName, _id, type, email } = u;
            const user = {
                firstName,
                lastName,
                _id,
                type,
                email,
            };
            const accessToken = jwt.sign(
                { user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30m" }
            );
            const refreshToken = jwt.sign(
                { user },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "1d" }
            );

            // add the refreshtoken to the database
            query =
                "INSERT INTO active_user (userId, refreshToken) VALUES (?, ?) ON DUPLICATE KEY UPDATE refreshToken = ?;";
            // ensure no duplicates
            const _ = await ActiveUser.deleteOne({ user: user._id }).exec();
            const activeUser = new ActiveUser({
                user: user._id,
                refreshToken,
            });
            await activeUser.save();
            // send the refreshToken as a cookie
            // maxAge is equal to 1 day
            debug(refreshToken);
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            debug("No Error.");
            return res.json({ user, accessToken });
        } else {
            debug("Passwords do NOT match.");
            res.status(401).json({ message: "Invalid password." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

module.exports = { handleLogin };
