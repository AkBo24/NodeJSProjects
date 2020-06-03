
import { bootCampSchema } from '../MongoDB/Schema/Bootcamp.js';
import { routesHandler } from '../Middleware/AsyncRoutesHandler.js'

/**
 * The error is handeled inside ErrorHandler.js
 */

//@Desc     Get all Bootcamps
//@Route    /api/v1/bootcamps/
//@Access   public
//@Request   GET
export const getBootCamps = routesHandler ( async (req, res, next) => {
    const allBC = await bootCampSchema.find();
    
    if (!allBC)
        return new res
            .status(400)
            .json({ success: false, msg: "No Bootcamps available" });

    res.json({ success: true, bootCamps: allBC });

});

//@Desc     Get single Bootcamp 
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  GET
export const getBootCamp = routesHandler(async (req, res, next) => {
    // console.log('hi!');
    
    const bootCamp = await bootCampSchema.findById(req.params.id);
    if (!bootCamp)
        return res
            .status(400)
            .json({ success: false, msg: `No Bootcamp with id ${req.params.id} available` });

    res.json({ success: true, bootCamp: bootCamp });

} )

//@Desc     Create a new Bootcamp
//@Route    /api/v1/bootcamps/
//@Access   private, for authorized users
//@Request  POST
export const createBootCamp = routesHandler( async (req, res, next) => {
    //Request bootcamp data from req.body
    const bcJSON = req.body;
    const bootCamp = await bootCampSchema.create(bcJSON);

    res
        .status(201)
        .json({ success: true, msg: `Created new bootcamp: ${bootCamp.id}` });

});

//@Desc     Update a Bootcamp
//@Route    /api/v1/bootcamps/:id
//@Access   private
//@Request  PUT
export async function updateCamp(req, res, next) {

    try{
        const newBC = await bootCampSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!newBC)
            return res.status(400).json( {success: false} )

        res.status(200).json( {success: true, msg: `Updated bootcamp ${newBC.name}`} );
    }
    catch(err) {
        next(err);
    }
}

//@Desc     Delete a Bootcamp
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  DELETE
export async function deleteCamp(req, res, next) {
    try {
        await bootCampSchema.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json( {success: true, msg: 'Bootcamp successfully deleted'} );
    }
    catch (err) {
        next(err);
    }
    // res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}



// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }
