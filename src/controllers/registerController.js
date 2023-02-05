const bcrypt = require("bcrypt");
const debug = require("debug")("register");
const emailValidator = require("email-validator");
const { createUserSchema } = require("../models/user/userSchema");
const { User } = require("../models/user/userModel");

const handleNewUser = async (req, res) => {
    debug(req.body);
    const { error, value } = createUserSchema.validate(req.body);
    debug(error);
    // validate the new user
    if (error) return res.status(400).json({ message: error.message });
    // TODO: find a better way to validate the email address
    if (!emailValidator.validate(value.email))
        return res.status(400).json({ message: "Invalid email provided." });
    try {
        // check to see if the email already exists in the database
        let results = await User.find({ email: value.email }).exec();
        debug(results);
        if (results.length !== 0)
            return res.status(409).json({ message: "Email already exists." });
        // attempt to hash the password
        const hashedPassword = await bcrypt.hash(value.password, 10);
        const { firstName, lastName, email, type } = value;
        const user = new User({
            firstName, 
            lastName,
            email,
            type,
            password: hashedPassword
        })
        await user.save();
        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
