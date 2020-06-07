import mongo from 'mongoose';
export async function connectMongo () {
    const db = await mongo.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false, 
        useUnifiedTopology: true
    });
    console.log(`Connected to mongoDB at ${db.connection.host}`.magenta.bold);
};