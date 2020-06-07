
import { bootCampSchema } from '../MongoDB/Schema/Bootcamp.js';
import { routesHandler  } from '../Middleware/AsyncRoutesHandler.js';
import { ErrorResponse  } from '../Utils/ErrorResponse.js';
import { geoCoder       } from '../Utils/GeoCoder.js';

/**
 * Errors are wrapped inside AsyncRoutesHandler.js which, if the promise is rejected by a thrown error,
 * is handled inside ErrorHandler.js
 */

//@Desc     Get all Bootcamps
//@Route    /api/v1/bootcamps/
//@Access   public
//@Request   GET
export const getBootCamps = routesHandler ( async (req, res, next) => {
    const allBC = await bootCampSchema.find();
    res.json({ success: true, count: allBC.length, bootCamps: allBC });
});

//@Desc     Get single Bootcamp 
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  GET
export const getBootCamp = routesHandler(async (req, res, next) => {
    
    const bootCamp = await bootCampSchema.findById(req.params.id);
    if (!bootCamp)
        return next( 
            new ErrorResponse( `Bootcamp with id "${req.params.id}" could not be found`, 404)
        );

    res.json({ success: true, bootCamp: bootCamp });

});

//@Desc     Get bootcamps around a radius
//@Route    /api/v1/bootcamps/radius/:zipcode/:distance
//@Access   public
//@Request  GET
export const getBootCampRad = routesHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geoCoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    
    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;
    
    // console.log(loc);
    // console.log(lat);
    // console.log(lng);
    // console.log(radius);

    //location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    const bootcamps = await bootCampSchema.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});

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
export const updateCamp = routesHandler(async (req, res, next) => {
    const newBC = await bootCampSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json( { success: true, msg: `Updated bootcamp ${newBC.name}` } );

});

//@Desc     Delete a Bootcamp
//@Route    /api/v1/bootcamps/:id
//@Access   public
//@Request  DELETE
export const deleteCamp = routesHandler(async (req, res, next) => {
    const delBC = await bootCampSchema.findByIdAndDelete(req.params.id);
    
    if(!delBC)
        return next(
            new ErrorResponse(`Bootcamp with id "${req.params.id}" could not be found`, 404)
        );

    res.status(200).json({ success: true, msg: `Bootcamp successfully deleted (id="${delBC.id}")` });
});



// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }
