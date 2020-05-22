//Required Modules
import express from 'express';
import dotenv  from 'dotenv';

//Try adding this to beginning of start in package.json scripts/start: NODE_ENV=

//Construct/Set-up the modules
const server = express();
dotenv.config( {path: './config/config.env'} );

server.get('/', (req, res) => {
    res.send('Hello');
})


//Set-up Node Server
const PORT = process.env.PORT || 3000
server.listen(PORT, '127.0.0.1');
console.log(`Listening to port ${PORT} in the server mode ${process.env.NODE_ENV}`);
