
/* Handle Courses CRUD Requests */
import express from 'express'

const routes = express();

//Get courses middleware
const {
    getCourses,
    createCourse,
    getSpecificCourse,
    updateCourse
} = require('./courses.js');

routes.route('/')
      .get(getCourses)
      .post(createCourse);

routes.route('/:bcID')
      .get(getSpecificCourse);

routes.route('/:courseId')
      .put(updateCourse);

module.exports = routes;