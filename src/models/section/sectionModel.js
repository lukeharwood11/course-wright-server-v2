const mongoose = require("mongoose");
const { Status, Accessibility } = require("../../data/mappings");

const sectionSchema = new mongoose.Schema({
    course: { type: mongoose.ObjectId, required: true },
    color: { type: String, required: true },
    number: { type: String, required: true },
    creator: { type: mongoose.ObjectId, required: true },
    status: {
        type: String,
        enum: [Status.CLOSED, Status.ENDED, Status.IN_PROGRESS, Status.OPEN],
    },
    accessibility: {
        link: String,
        linkSharingEnabled: { type: Boolean, required: true },
        autoEntrance: { type: Boolean, required: true },
    },
    teachers: [
        {
            user: { type: mongoose.ObjectId, required: true },
            role: { type: String, required: true },
        },
    ],
    members: [
        {
            user: { type: mongoose.ObjectId, required: true },
            role: { type: String, required: true },
        },
    ],
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = { Section };
