
import { coursesSchema  } from '../MongoDB/Schema/Courses.js';
import { routesHandler  } from '../Middleware/AsyncRoutesHandler.js';
import { ErrorResponse  } from '../Utils/ErrorResponse.js';
import { bootCampSchema } from '../MongoDB/Schema/Bootcamp.js';

/*
*  Handles all courses functionality (CRUD: Create, Read, Update, Delete)
*/

//@Desc     Get all Courses or the courses of a specific bootcamp
//@Route    /api/v1/courses/
//@Route    /api/v1//courses
//@Access   public
//@Request  GET
export const getCourses = routesHandler ( async(req, res, next) => {
    const allCourses = await coursesSchema.find();
    res
        .status(200)
        .json({ success: true, count: allCourses.length, data: allCourses });
});

//@Desc     Get all Courses or the courses of a specific bootcamp
//@Route    /api/v1/courses/:bootcampID
//@Route    /api/v1//courses
//@Access   public
//@Request  GET
export const getSpecificCourse = routesHandler (async (req, res, next) => {
    const bcID = req.params.bcID;
    
    //Find the corresponding bootcamp
    const bootCamp = await bootCampSchema.findById(bcID, (err, res) => {
        if(err) { 
            console.log(err);
            return next(
                new ErrorResponse(`${err}`)
            );
        }
    });

    //Find all courses wtih the affiliated bootcamp (iterate through courses collection)
    const courses = await bootCampSchema.find(bootCamp, (err, res) => {
        if (err) {
            console.log(err);
            return next(
                new ErrorResponse(`${err}`)
            );
        }
    });

    res
        .status(200)
        .json({ success : true, courses , bootCamp });

});


//@Desc     Create a course for a bootcamp
//@Route    /api/v1/courses/
//@Access   public
//@Request  POST
export const createCourse = routesHandler( async (req, res, next) => {
    const courseJSON   = req.body;
    const newCourse    = await coursesSchema.create(courseJSON);
    console.log(newCourse);
    
    res
        .status(201)
        .json({ success: true, mssg: `Created new course (${newCourse.id})`});
})