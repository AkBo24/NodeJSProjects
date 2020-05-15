/*
*  The main controller for the todo-list app
*/

/* Required Modules and variables */
const express    = require('express');
const controller = require('./controllers/controller');
const app        = express();

app.set('view engine', 'ejs');
app.use(express.static('./assets/master.css'));
controller.routes(app);


app.listen(3000, '127.0.0.1'); //send server to localhost
console.log('Listening to port 3000 on localhost');
