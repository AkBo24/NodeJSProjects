export const errorHandler = (err, req, res, next) => {
    //Log Err
    console.log(err.stack.red);
    
        res
            .status(500)
            .json({ success: false, err: err.message });
}