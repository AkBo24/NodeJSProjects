//Try adding this to beginning of start in package.json scripts/start: NODE_ENV=

//Required Modules
// require("@babel/core").transform("code", options);
import express   from 'express';
import dotenv    from 'dotenv';
import colors    from 'colors';
import bootcamps from './controllers/controller.js';
import courses   from './controllers/coursesController.js';
import { connectMongo } from './MongoDB/database.js';
import errorHandler from './Middleware/ErrorHandler.js';

//Construct/Set-up the modules
const server = express();
server.use(express.json()) //Body Parser Middleware
dotenv.config( {path: './config/config.env'} ); //get environment enumerators (constants)

//Connect to MongoDB
connectMongo();

//Mount Routers
server.use('/api/v1/bootcamps', bootcamps); //set default route
server.use('/api/v1/courses', courses);
server.use(errorHandler);

//Set-up Node Server
const PORT = process.env.PORT || 3000
server.listen(PORT, '127.0.0.1');
console.log(`Listening to port ${PORT} in the server mode ${process.env.NODE_ENV}`.cyan.bold);

//Handeling Exceptions
process.on('unhandeledRejection', (err, promise) => {
    console.log(`Unhandeled Promise: ${err.message}`.red.bold);
    //close and quit server
    server.close(() => process.exit(1));
});