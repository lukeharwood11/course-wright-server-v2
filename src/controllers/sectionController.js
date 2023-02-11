const { Section } = require("../models/section/sectionModel");
const {
    newSectionSchema,
    newSectionBatchSchema,
} = require("../models/section/sectionSchema");
const { v4: uuid } = require("uuid");
const { Status } = require("../data/mappings");

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
        course,
        number,
        status,
        color,
        linkSharingEnabled,
        autoEntrance,
        teachers,
        members,
    } = value;

    // generate a random name with the section number and course code
    try {
        const section = new Section({
            course,
            number,
            status,
            color,
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

const handlePostUserSectionBatch = async (req, res) => {
    const user = req.user;

    // validate input
    const { error, value } = newSectionBatchSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    // destructure request
    const {
        course,
        numbers,
        colors,
        linkSharingEnabled,
        autoEntrance,
        teachers,
        members,
    } = value;

    // generate a random name with the section number and course code
    try {
        const sections = [];

        for (let i = 0; i < numbers.length; ++i) {
            const number = numbers[i];
            const color = colors[i];
            const obj = {
                course,
                number,
                color,
                status: Status.OPEN,
                accessibility: {
                    link: "/link/to/join",
                    autoEntrance,
                    linkSharingEnabled,
                },
                creator: user._id,
                teachers,
                members,
            };
            sections.push(obj);
        }

        const _ = await Section.insertMany(sections);

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

module.exports = {
    handleGetUserSections,
    handlePostUserSection,
    handlePostUserSectionBatch,
};
