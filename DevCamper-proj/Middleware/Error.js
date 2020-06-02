const errorHandler = (err, req, res, next) => {
    //Log Err
    
    console.log(err.stack.red);
    
    //Retun message to user
    res
        .status(500)
        .json({ success: false, err: err.message });
};

module.exports = errorHandler;