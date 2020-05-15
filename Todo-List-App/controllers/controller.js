routes = (app) => {
  app.get('/todo', (req, res) => {
    res.render('todo.ejs');
  });

  app.post('/todo', (req, res) => {

  });

  app.delete('/todo', (req, res) => {

  });

}

module.exports = {
  routes: routes
}
