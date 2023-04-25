const express = require('express');
const router = express.Router();
const { getCourses, getCourse, createCourse, deleteCourse } = require('../controllers/courseController');
// , updateCourse, deleteCourse

router.route('/').get(getCourses).post(createCourse);

router.route('/:id').get(getCourse).delete(deleteCourse);

module.exports = router;
