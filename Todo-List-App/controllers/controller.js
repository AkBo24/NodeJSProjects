const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded( {extended: false} );
let   data = [{item: "todo 1"}, {item: "todo 2"}, {item: "todo 3"}];

routes = (app) => {
  app.get('/todo', (req, res) => {
    res.render('todo.ejs', {data: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push( req.body );
    res.render('todo.ejs', {data: data})
  });

  app.delete('/todo', (req, res) => {

  });

}

module.exports = {
  routes: routes
}
