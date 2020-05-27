
// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }

// routes.get('/', (req, res) => {
//     res.json({ success: true, msg: 'Show all bootcamps' });
// });

export function getBootCamps(req, res, next) {
    res.json({ success: true, msg: 'Show all bootcamps' });
}

// routes.get('/:id', (req, res) => {
//     res.json({ success: true, msg: `Viewing bootcamp ${req.params.id}` });
// });

export function getBootCamp(req, res, next) {
    res.json({ success: true, msg: `Viewing bootcamp ${req.params.id}` });
}

// routes.post('/', (req, res) => {
//     res.json({ success: true, msg: `Create new bootcamp` });
// });

export function createBootCamp(req, res, next) {
    res.json({ success: true, msg: `Create new bootcamp` });
}

// routes.put('/:id', (req, res) => {
//     res.json({ success: true, msg: `Updating bootamp ${req.params.id}` });
// });

export function updateCamp(req, res, next) {
    res.json({ success: true, msg: `Updating bootamp ${req.params.id}` });
}

// routes.delete('/:id', (req, res) => {
//     res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
// });
export function deleteCamp(req, res, next) {
    res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}
