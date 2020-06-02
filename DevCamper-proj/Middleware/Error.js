const errorHandler = (err, req, res, next) => {
    //Log Err
    
    console.log(err.stack.red);
    
    //Retun message to user
    res
        .status(err.statusCode || 500)
        .json({ success: false, err: err.message || 'Server Error' });
};

module.exports = errorHandler;