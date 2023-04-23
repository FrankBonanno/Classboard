const Course = require('../models/Course');

const getCourses = async (req, res) => {
    const userId = req.user.userId;
    const courses = await Course.find({ createdBy: userId });
    res.status(200).json({ count: courses.length, courses });
};

module.exports = { getCourses };
