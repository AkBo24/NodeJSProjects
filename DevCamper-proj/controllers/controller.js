import express from 'express';
const  routes = express.Router();

//Get route middleware
const {
    notFound,
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateCamp,
    deleteCamp
} = require('./routes.js');

//Routes config
routes.route('/')
      .get(getBootCamps)
      .post(createBootCamp);

routes.route('/:id')
      .get(getBootCamp)
      .put(updateCamp)
      .delete(deleteCamp);

module.exports = routes;