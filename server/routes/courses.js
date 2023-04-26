const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, deleteCourse, updateCourse } = require('../controllers/courseController');
const { createAssignment } = require('../controllers/assignmentController');

router.route('/').get(getCourses).post(createCourse);

router.route('/:id').get(getCourse).delete(deleteCourse).patch(updateCourse);

router.route('/:id/assignments').post(createAssignment);

module.exports = router;
