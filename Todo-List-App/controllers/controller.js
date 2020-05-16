
//required modules:
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//module set-up:
const urlencodedParser = bodyParser.urlencoded( {extended: false} );

mongoose.connect('mongodb+srv://todoUser:admin@todo-app-practice-hcsru.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Set up schema and model for mongodb (Schema - a template)
const mongooseSchema = new mongoose.Schema({
  item: String
});
const Todo = mongoose.model('Todo', mongooseSchema);

//Dummy data
const item = Todo({item: 'Finish project'}).save((err) => {
  if(err) throw err;
})

let   data = [{item: "todo 1"}, {item: "todo 2"}, {item: "todo 3"}]; //dummy data

routes = (app) => {
  app.get('/todo', (req, res) => {
    res.render('todo.ejs', {data: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push( req.body );
    res.render('todo.ejs', {data: data});
    // res.json(data);
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter( (todo) => {
      return todo.item.replace(/ /g, "-") !== req.params.item
    });
    res.render('todo.ejs', {data: data});
  });

}

module.exports = {
  routes: routes
}
