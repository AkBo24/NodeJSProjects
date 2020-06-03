import { ErrorResponse } from '../Utils/ErrorResponse.js'

const errorHandler = (err, req, res, next) => {

    let error   = {...err};
    let message = undefined;
    error.message = err.message;

    /*  Error Handlers for Mongoose DB  */
    //@Request  : GET
    //@Desc     : Bootcamp w/ specific id could not be found
    if(err.name === 'CastError') {
        message = `Bootcamp with the id ${error.value} could not be found.`
        error   = new ErrorResponse(message, 404);
    }
    //@Request  : POST
    //@Desc     : Pushing/creating a boot camp that already exists in the database
    if (err.code === 11000) {
        message = `Bootcamp already exists (duplicate id)`
        error   =  new ErrorResponse(message, 400);
    }
    
    //Dev Log errors
    console.log(err.stack.red);
    //Retun message to user
    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;