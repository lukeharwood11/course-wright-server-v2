const mongoose = require("mongoose");

// [docs](https://mongoosejs.com/docs/schematypes.html]
const courseSchema = new mongoose.Schema({
    creator: { type: mongoose.ObjectId, required: true },
    dateCreated: { type: Date, default: Date.now },
    name: { type: String, required: true },
    description: String,
    code: String,
    subject: String,
    photoId: String,
    visibility: { type: String, required: true },
    sharing: { type: String, required: true },
    access: [
        {
            user: mongoose.ObjectId,
            role: String,
        },
    ],
    sections: [mongoose.ObjectId],
    link: { type: Boolean, default: false },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
