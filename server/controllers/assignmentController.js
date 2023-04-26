const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const Course = require('../models/Course');

const createAssignment = async (req, res) => {
    const userId = req.user.userId;
    const courseId = req.params.id;
    const { name, dueDate } = req.body;

    const course = await Course.findOne({ _id: courseId, createdBy: userId });
    if (!course) {
        throw new NotFoundError(`No Course Found With ID: ${courseId}`);
    }

    const newAssignment = {
        name,
        dueDate,
        completed: false,
    };

    course.assignments.push(newAssignment);
    await course.save();

    res.status(StatusCodes.CREATED).json({ assignment: newAssignment });
};

module.exports = { createAssignment };
