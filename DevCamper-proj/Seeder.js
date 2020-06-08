
import fs from 'fs';
import mongo from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

//Get process environment variables
dotenv.config({ path: 'config/config.env' });

/* mongoDB Set-up */
//Load database Models
const bcModel = require('./MongoDB/Schema/Bootcamp.js');

//Connect to bootcamp database
const db = mongo.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
});
console.log("Connected to mongoose".brightMagenta.bold);

/* Get JSON data from the project resources directory */
//Import bootcamps.json
const allBC = JSON.parse(
    fs.readFileSync(`${__dirname}/devcamper_project_resources/_data/bootcamps.json`, 'utf-8')
);
console.log("Read bootcamp data".cyan.bold);


/* Run seeder commands to import/delete data */
//Import all bootcamp data into db
const importBC = async () => {
    try{
        await bcModel.create(allBC);
        console.log("Bootcamp data imported...".brightMagenta.bold);
        process.exit();
    }
    catch(err) {
        console.log(err);
    }
};

//Delete all bootcamp data into db
const deleteBC = async () => {
    try {
        await db.deleteMany();
        console.log("Bootcamp data imported...".brightMagenta.bold);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};


/* RC Commands to import/delete data */
console.log(process.argv);
const args = process.argv[3];
console.log(args);

if(process.argv[2] === '-i')
    console.log("Imported");
    
    // importData();
else if(process.argv[2] === '-d')
    deleteBC();