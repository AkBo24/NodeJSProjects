
/* Handle Courses CRUD Requests */
import express from 'express'

const routes = express();

//Get courses middleware
const {
    getCourses,
    createCourse,
    getSpecificCourse,
    updateCourse,
    deleteCourse
} = require('./courses.js');

routes.route('/')
      .get(getCourses)
      .post(createCourse);

routes.route('/:bcID')
      .get(getSpecificCourse);

routes.route('/:courseId')
      .put(updateCourse);

routes.route('/:courseId')
      .delete(deleteCourse);

module.exports = routes;