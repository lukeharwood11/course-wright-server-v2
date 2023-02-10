const Joi = require("joi");

const newCourseSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().uppercase().required(),
    visibility: Joi.string().required(),
    color: Joi.string().required(),
    shareOption: Joi.string().required(),
    subject: Joi.string().lowercase(),
    tags: Joi.array(),
    description: Joi.string(),
});

const updateCourseSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().uppercase(),
    subject: Joi.string().lowercase(),
    color: Joi.string(),
    tags: Joi.array(),
    description: Joi.string(),
    visibility: Joi.string(),
    shareOption: Joi.string(),
});

module.exports = { newCourseSchema, updateCourseSchema };
