const { Section } = require("../models/section/sectionModel");
const { newSectionSchema } = require("../models/section/sectionSchema");
const { v4: uuid } = require("uuid");

const handleGetUserSections = async (req, res) => {
    const user = req.user;

    try {
        const sections = await Section.find({ creator: user._id }).exec();
        return res.status(200).json({ sections });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

const handlePostUserSection = async (req, res) => {
    const user = req.user;

    // validate input
    const { error, value } = newSectionSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    // destructure request
    const {
        sectionNumber,
        status,
        linkSharingEnabled,
        autoEntrance,
        teachers,
        members,
    } = value;

    // generate a random name with the section number and course code
    try {
        const section = new Section({
            sectionNumber,
            status,
            accessibility: {
                link: "/link/to/join",
                autoEntrance,
                linkSharingEnabled,
            },
            creator: user._id,
            teachers,
            members,
        });

        const successSection = await section.save();
        return res.status(201).json({ section: successSection });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports = { handleGetUserSections, handlePostUserSection };
