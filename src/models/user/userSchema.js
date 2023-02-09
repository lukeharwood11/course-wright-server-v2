const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const createUserSchema = Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().required(),
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    confirmPassword: Joi.ref("password"),
});

module.exports = { loginSchema, createUserSchema };
