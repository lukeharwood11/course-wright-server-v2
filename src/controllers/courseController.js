const { Roles } = require("../data/mappings");
const { Course } = require("../models/course/courseModel");
const {
    newCourseSchema,
    updateCourseSchema,
} = require("../models/course/courseSchema");

const handleGetUserCourses = async (req, res) => {
    const user = req.user;
    try {
        const courses = await Course.find({ creator: user._id }).exec();
        return res.status(200).json({ courses });
    } catch (err) {
        return res.status(500).json({ message: err?.message });
    }
    // get all courses where the user is
};

/**
 * Add a new course to the database
 * @param {*} req - contains a body with the course object
 * @param {*} res
 */
const handlePostUserCourse = async (req, res) => {
    const user = req.user;
    const { value, error } = newCourseSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });
    try {
        const course = new Course({
            ...value,
            creator: user._id,
            access: [{ user: user._id, role: Roles.CREATOR }],
        });

        const successCourse = await course.save();
        return res.status(201).json({ course: successCourse });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

/**
 *
 * @param {*} req - Contains req.params for course id
 * @param {*} res
 * @returns
 */
const handlePatchUserCourse = async (req, res) => {
    const user = req.user;
    const courseId = req.params.id;
    const { value, error } = updateCourseSchema.validate(req.body);
    if (error) return res.status(404).json({ message: error.message });
    try {
        const course = await Course.findById(courseId);
        if (!course)
            return res.status(404).json({ message: "Course does not exist." });
        // check to see if user has permissions to edit
        let permissions = false;
        for (let i = 0; i < course.access.length; ++i) {
            const ac = course.access[i];
            if (
                (ac.user.toString() === user._id &&
                    ac.role === Roles.CREATOR) ||
                ac.role === Roles.EDIT
            )
                permissions = true;
        }
        if (!permissions)
            return res.status(403).json({ message: "Invalid Permissions." });
        const upResult = await Course.updateOne(
            { _id: courseId },
            { ...value }
        );

        const returnUpdatedObject = await Course.findById(courseId);

        return res.status(200).json({ course: returnUpdatedObject });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

module.exports = {
    handleGetUserCourses,
    handlePostUserCourse,
    handlePatchUserCourse,
};
