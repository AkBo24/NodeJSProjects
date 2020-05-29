
import { bootCampSchema } from '../MongoDB/Schema/Bootcamp.js';
import { restart } from 'nodemon';
// const bootCampSchema = require('../MongoDB/Schema/Bootcamp.js');

//@Desc     Get all boot camps
//@Route    /api/v1/bootcamps/
//@Access   public
//@Request   GET
export async function getBootCamps(req, res, next) {
    try{
        const allBC = await bootCampSchema.find();
        if(!allBC) 
            return res
                    .status(400)
                    .json( {success: false, msg: "No boot camps available"} );
        
        res.json({ success: true, bootCamps: allBC });
    }
    catch (err) {
        res
            .status(400)
            .json( {success: false, msg: err} );
    }

}

//@Desc     Get single boot camp 
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  GET
export async function getBootCamp(req, res, next) {

    try {
        const allBC = await bootCampSchema.findById(req.params.id);
        if (!allBC)
            return res
                .status(400)
                .json({ success: false, msg: "No boot camps available" });

        res.json({ success: true, bootCamps: allBC });
    }
    catch (err) {
        res
            .status(400)
            .json({ success: false, msg: err });
    }

    // res.json({ success: true, msg: `Viewing bootcamp ${req.params.id}` });
}

//@Desc     Create a new Bootcamp
//@Route    /api/v1/bootcamps/
//@Access   private, for authorized users
//@Request  POST
export async function createBootCamp(req, res, next) {

    //Request bootcamp data from req.body
    // console.log(typeof bootCampSchema);
    try {
        const bcJSON = req.body;
        const newBootCamp = await bootCampSchema.create(bcJSON);

        res
            .status(201)
            .json({ success: true, msg: `Created new bootcamp: ${bcJSON.name}` });
    }
    catch(err) {
        res
            .status(400)
            .json( {success: false, } );
    }
}

//@Desc     Update a boot camp
//@Route    /api/v1/bootcamps/:id
//@Access   private
//@Request  PUT
export function updateCamp(req, res, next) {
    res.json({ success: true, msg: `Updating bootamp ${req.params.id}` });
}

//@Desc     Delete a boot camps
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  DELETE
export function deleteCamp(req, res, next) {
    res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}



// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }
