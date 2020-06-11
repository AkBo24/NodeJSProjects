
/* Handle Courses CRUD Requests */
import express from 'express'

const routes = express();

//Get courses middleware
const {
    getCourses,
    createCourse,
    getSpecificCourse
} = require('./courses.js');

routes.route('/')
      .get(getCourses)
      .post(createCourse);

routes.route('/:bcID')
      .get(getSpecificCourse);

module.exports = routes;