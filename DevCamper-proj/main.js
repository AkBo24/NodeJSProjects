//Try adding this to beginning of start in package.json scripts/start: NODE_ENV=

//Required Modules
// require("@babel/core").transform("code", options);
import express from 'express';
import dotenv  from 'dotenv';
import controller   from './controllers/controller.js';
import database, { connectMongo } from './MongoDB/database.js'

//Construct/Set-up the modules
const server = express();
dotenv.config( {path: './config/config.env'} ); //get environment enumerators (constants)

//Connect to MongoDB
connectMongo();

//Web app routes etc
server.use('/api/v1/bootcamps', controller); //set default route
// controller();

//Set-up Node Server
const PORT = process.env.PORT || 3000
server.listen(PORT, '127.0.0.1');
console.log(`Listening to port ${PORT} in the server mode ${process.env.NODE_ENV}`);
