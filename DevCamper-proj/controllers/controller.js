import express from 'express';
const  routes = express.Router();

routes.get('/', (req, res) => {
    res.status(404).json( {success: false, msg: "page not found"} )
});

routes.get('/', (req, res) => {
    res.json( {success: true, msg: 'Show all bootcamps'} );
});

routes.get('/:id', (req, res) => {
    res.json( { success: true, msg: `Viewing bootcamp ${req.params.id}` });
});   

routes.post('/', (req, res) => {
    res.json( { success: true, msg: `Create new bootcamp` });
});

routes.put('/:id', (req, res) => {
    res.json( { success: true, msg: `Updating bootamp ${req.params.id}` });
});

routes.delete('/:id', (req, res) => {
   res.json( { success: true, msg: `Deleted bootcamp ${req.params.id}` } );
});

module.exports = routes;