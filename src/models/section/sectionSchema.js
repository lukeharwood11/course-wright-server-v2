const Joi = require("joi");
const { Status } = require("../../data/mappings");

const newSectionSchema = Joi.object({
    course: Joi.string().required(),
    color: Joi.string().required(),
    number: Joi.string().required(),
    linkSharingEnabled: Joi.boolean().required(),
    autoEntrance: Joi.boolean().default(false),
    teachers: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
    members: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
});

const newSectionBatchSchema = Joi.object({
    course: Joi.string().required(),
    numbers: Joi.array().items(Joi.string()),
    colors: Joi.array().items(Joi.string()),
    linkSharingEnabled: Joi.boolean().required(),
    autoEntrance: Joi.boolean().default(false),
    teachers: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
    members: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
});

const editSectionSchema = Joi.object({
    color: Joi.string().required(),
    sectionNumber: Joi.string(),
    status: Joi.string().valid(
        Status.CLOSED,
        Status.ENDED,
        Status.IN_PROGRESS,
        Status.OPEN
    ),
    linkSharingEnabled: Joi.boolean(),
    autoEntrance: Joi.boolean().default(false),
    teachers: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
    members: Joi.array().items(
        Joi.object({
            user: Joi.string(),
            role: Joi.string(),
        })
    ),
});

module.exports = { newSectionSchema, editSectionSchema, newSectionBatchSchema };
