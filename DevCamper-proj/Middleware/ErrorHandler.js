import { ErrorResponse } from '../Utils/ErrorResponse.js'

const errorHandler = (err, req, res, next) => {
    
    let error   = {...err};
    let message = undefined;
    error.message = err.message;

    /*  Error Handlers for Mongoose DB  */
    //@Request  : GET
    //@Desc     : Bootcamp w/ specific id could not be found
    if (err.name === 'CastError') {
        message = `Bootcamp with the id ${error.value} could not be found.`
        error   = new ErrorResponse(message, 404);
    }
    //@Request  : POST
    //@Desc     : Pushing/creating an that already exists in the database
    if (err.code === 11000) {
        message = 'Duplicate Item'
        error   =  new ErrorResponse(message, 400);
    }
    
    //@Request  : POST
    //@Desc     : Creating a boot camp with missing values
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message);
        error   = new ErrorResponse(message, 400);
    }

    //Dev Log errors
    console.log(err);
    //Retun message to user
    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;