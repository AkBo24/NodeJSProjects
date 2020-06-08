
import { coursesSchema} from '../MongoDB/Schema/Courses.js';
import { routesHandler } from '../Middleware/AsyncRoutesHandler.js';
import { ErrorResponse } from '../Utils/ErrorResponse.js';

/*
*  Handles all courses functionality (CRUD: Create, Read, Update, Delete)
*/

//@Desc     Get all Courses or the courses of a specific bootcamp
//@Route    /api/v1/courses/
//@Route    /api/v1/:bootcampId/courses
//@Access   public
//@Request  GET
export const getCourses = routesHandler ( async(req, res) => {
    res.send("Not yet implemented");
});


//@Desc     Create a course for a bootcamp
//@Route    /api/v1/courses/
//@Access   public
//@Request  POST
export const createCourse = routesHandler( async (req, res) => {
    const courseJSON   = req.body;
    const newCourse    = await coursesSchema.create(courseJSON);
    console.log(newCourse);
    
    res
        .status(201)
        .json({ success: true, mssg: `Created new course (${newCourse.id})`});
})