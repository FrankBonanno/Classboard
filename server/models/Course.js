const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please Provide The Assignment Name'],
            trim: true,
        },
        dueDate: {
            type: Date,
            default: new Date(),
            required: [true, 'Please Provide The Due Date'],
        },
        completed: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide The Course Name'],
        trim: true,
    },
    color: {
        type: String,
        required: [true, 'Please Provide A Course Color'],
    },
    assignments: {
        type: [AssignmentSchema],
        default: [],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please Provide User'],
    },
});

module.exports = mongoose.model('Course', CourseSchema);
