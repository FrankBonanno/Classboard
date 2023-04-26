const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const Course = require('../models/Course');

const getCourses = async (req, res) => {
    const userId = req.user.userId;
    const courses = await Course.find({ createdBy: userId });
    res.status(200).json({ count: courses.length, courses });
};

const getCourse = async (req, res) => {
    const userId = req.user.userId;
    const courseId = req.params.id;
    const course = await Course.findOne({ _id: courseId, createdBy: userId });
    if (!course) {
        throw new NotFoundError(`No Course Found With ID: ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course });
};

const createCourse = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ course });
};

const deleteCourse = async (req, res) => {
    const userId = req.user.userId;
    const courseId = req.params.id;
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId, createdBy: userId });
    if (!deletedCourse) {
        throw new NotFoundError(`No Course Found With ID: ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ deletedCourse });
};

const updateCourse = async (req, res) => {
    const userId = req.user.userId;
    const courseId = req.params.id;

    const course = await Course.findOne({ _id: courseId, createdBy: userId });
    if (!course) {
        throw new NotFoundError(`No Course Found With ID: ${courseId}`);
    }

    const { name, color, assignments } = req.body;

    if (name) {
        course.name = name;
    }
    if (color) {
        course.color = color;
    }
    if (assignments) {
        course.assignments = assignments;
    }

    await course.save();

    res.status(StatusCodes.OK).json({ updatedCourse: course });
};

module.exports = { getCourses, getCourse, createCourse, deleteCourse, updateCourse };
