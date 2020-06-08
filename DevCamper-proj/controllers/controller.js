
/* Handle Bootcamp CRUD Requests*/
import express from 'express';
const  routes = express.Router();

//Get bootcamp middleware
const {
    notFound,
    getBootCamps,
    getBootCamp,
    getBootCampRad,
    createBootCamp,
    updateCamp,
    deleteCamp,
} = require('./routes.js');

//Bootcamp request handlers config
routes.route('/')
      .get(getBootCamps)
      .post(createBootCamp);

routes.route('/:id')
      .get(getBootCamp)
      .put(updateCamp)
      .delete(deleteCamp);

routes.route(`/radius/:zipcode/:distance`)
      .get(getBootCampRad);

module.exports = routes;