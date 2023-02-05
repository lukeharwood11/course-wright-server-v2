const jwt = require("jsonwebtoken");
const debug = require("debug")("authentication");
const { ActiveUser } = require("../models/user/userModel");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
    // check to see if the request contains a cookie
    const cookies = req.cookies;
    debug("Attempting to refresh the token!");
    debug(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    try {
        // check to see if the refresh token is in the database with the correct user
        const result = await ActiveUser.find({
            refreshToken: cookies.jwt,
        }).exec();
        if (result.length === 0)
            return res.status(403).json({
                message: "Refresh token does not exist in the database.",
            });

        const activeUser = result[0];
        // verify the jwt and verify that the ids of the found user matches
        jwt.verify(
            cookies.jwt,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.user._id !== activeUser?.user.toString()) {
                    return res.status(403).json({ message: err });
                }
                const { user } = decoded;
                const accessToken = jwt.sign(
                    { user },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "30m" }
                );
                console.log(accessToken);
                debug("Success! Access token returned.");
                res.status(200).json({ user, accessToken });
            }
        );
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { handleRefreshToken };
