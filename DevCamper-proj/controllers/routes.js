
import { bootCampSchema } from '../MongoDB/Schema/Bootcamp.js';
import { ErrorResponse  } from '../Utils/ErrorResponse.js'

//@Desc     Get all boot camps
//@Route    /api/v1/bootcamps/
//@Access   public
//@Request   GET
export async function getBootCamps(req, res, next) {
    try{
        const allBC = await bootCampSchema.find();
        if(!allBC) 
            return new res
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
        next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404));
    }
}

//@Desc     Create a new Bootcamp
//@Route    /api/v1/bootcamps/
//@Access   private, for authorized users
//@Request  POST
export async function createBootCamp(req, res, next) {
    //Request bootcamp data from req.body
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
            .json( {success: false, err } );
    }
}

//@Desc     Update a boot camp
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
        res
            .status(400)
            .json({ success: false, err });
    }

    res.json({ success: true, msg: `Updating bootamp ${req.params.id}` });
}

//@Desc     Delete a boot camps
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
        res
            .status(400)
            .json({ success: false, msg: 'Bootcamp ', err});
    }
    // res.json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
}



// routes.get('/', (req, res) => {
//     res.status(404).json({ success: false, msg: "page not found" })
// });

// exports.notFound(req, res, next) {
//     res.status(404).json({ success: false, msg: "page not found" });
// }
