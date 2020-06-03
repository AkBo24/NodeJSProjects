import { ErrorResponse } from '../Utils/ErrorResponse.js'

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    error.message = err.message;
    
    /*  Error Handlers for Mongoose DB  */

    //@Reqest   : GET
    //@Desc     : Bootcamp w/ specific id could not be found
    if(err.name === 'CastError') {
        const message = `Bootcamp with the id ${error.value} could not be found.`
        console.log(typeof ErrorResponse);
        
        error = new ErrorResponse(message, 404);
    }

    //Dev Log errors
    console.log(err.stack.red);
    //Retun message to user
    res
        .status(error.statusCode || 500)
        .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;