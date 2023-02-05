const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

const createUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
    // TODO: implement 'type'
});

module.exports = { loginSchema, createUserSchema };
