const controller = (server) => {
    server.get('/', (req, res) => {
        res.status(404).json( {success: false, msg: "page not found"} )
    });
    
    server.get('/api/v1/bootcamps', (req, res) => {
        res.json( {success: true, msg: 'Show all bootcamps'} );
    });

    server.get('/api/v1/bootcamps/:id', (req, res) => {
        res.json( { success: true, msg: `Viewing bootcamp ${req.params.id}` });
    });   
    
    server.post('/api/v1/bootcamps', (req, res) => {
        res.json( { success: true, msg: `Create new bootcamp` });
    });

    server.put('/api/v1/bootcamps/:id', (req, res) => {
        res.json( { success: true, msg: `Updating bootamp ${req.params.id}` });
    });

    server.delete('/api/v1/bootcamps/:id', (req, res) => {
        res.json( { success: true, msg: `Deleted bootcamp ${req.params.id}` } );
    });
};

export default controller;