
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
    
    //Isolate select & other params (creating custom fields)
    const reqQuery = {...req.query};
    const removeFields = ['select', 'sort', 'page', 'limit']; //fields to exclude
    removeFields.forEach((param) => delete reqQuery[param]); //loop over removeFields

    //Parse any queries, and replace any matching regEx into a MongoseDB object ('$')
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/ , match => `$${match}`);
    let query = bootCampSchema.find(JSON.parse(queryStr)).populate('courses');

    //Select Field
    if (req.query.select) {
        const select = req.query.select.split(',').join(' ');
        query = query.select(select);
    }

    //Sorting
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }
    else
        query = query.sort('-createdAt');              //If no sorting option specified, sort by date (younger first)

    //Pagination
    const page  = parseInt(req.query.page,  10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25; //The most # of bootcamps to show on a page
    const startIndex = (page - 1) * limit;
    const endIndex   = page * limit;
    const total      = await bootCampSchema.countDocuments();
    
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page : page + 1,
            limit
        }
    }

    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    
    const allBC = await query;
    res.json({ success: true, count: allBC.length, pagination, bootCamps: allBC });
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
