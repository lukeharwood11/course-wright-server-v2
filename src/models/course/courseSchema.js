const Joi = require("joi");

const newCourseSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().uppercase().required(),
    subject: Joi.string().lowercase(),
    tags: Joi.array(),
    description: Joi.string(),
});

const updateCourseSchema = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().uppercase(),
    subject: Joi.string().lowercase(),
    tags: Joi.array(),
    description: Joi.string(),
});

module.exports = { newCourseSchema, updateCourseSchema };
