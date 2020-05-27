
// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }

//@Desc     Get all boot camps
//@Route    /api/v1/bootcamps/
//@Access   public
export function getBootCamps(req, res, next) {
    res.json({ success: true, msg: 'Show all bootcamps' });
}

//@Desc     Get single boot camp 
//@Route    /api/v1/bootcamps/:id
//@Access   public

export function getBootCamp(req, res, next) {
    res.json({ success: true, msg: `Viewing bootcamp ${req.params.id}` });
}

//@Desc     Create a new Bootcamp
//@Route    /api/v1/bootcamps/
//@Access   private, for authorized users

export function createBootCamp(req, res, next) {
    res.json({ success: true, msg: `Create new bootcamp` });
}

//@Desc     Update a boot camp
//@Route    /api/v1/bootcamps/:id
//@Access   private

export function updateCamp(req, res, next) {
    res.json({ success: true, msg: `Updating bootamp ${req.params.id}` });
}

//@Desc     Delete a boot camps
//@Route    /api/v1/bootcamps/:id
//@Access   public

export function deleteCamp(req, res, next) {
    res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}
