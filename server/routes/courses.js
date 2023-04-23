const express = require('express');
const router = express.Router();
const { getCourses } = require('../controllers/courseController');
// , getCourse, createCourse, updateCourse, deleteCourse

router.route('/').get(getCourses);

module.exports = router;
