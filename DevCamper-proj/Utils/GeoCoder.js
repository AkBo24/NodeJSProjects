import NodeGeocoder from 'node-geocoder'
import dotenv from 'dotenv';
dotenv.config( { path: './config/config.env' } );

const options = {
    provider: process.env.GEOCODE_PROVIDER,
    httpAdapter: "https",
    apiKey: process.env.GEO_API_KEY,
    formatter: null
};
export const geoCoder = NodeGeocoder(options);
// console.log(typeof geoCoder);

// module.exports = geoCoder;