
/* Handle Courses CRUD Requests */
import express from 'express'

const routes = express();

//Get courses middleware
const {
    getCourses,
    createCourse
} = require('./courses.js');

routes.route('/')
      .get(getCourses)
      .post(createCourse);

module.exports = routes;