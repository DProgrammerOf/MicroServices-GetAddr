import mongodb_config from './config/mongo-db'
import { Express } from 'express';
import mongoose from 'mongoose'
import locations from './api/routes/locations'

// setup mongodb
function setup_mongodb () {
    mongoose.connect(mongodb_config.MONGO_URL)
    .then(() => console.log('Connected to MongoDB!'));
}
    
// setup rabbitqm
function setup_rabbitqm () {
    console.log('Rabbit started!')
}

// setup routes
function setup_routes (server: Express) {
    server.get('/address', (request, response) => {
        response.status(200).json({message:'route called!'})
    })

    server.use('/location', locations);
}

// setup headers server
function setup_http (server: Express) {

}

function setup_app (server: Express) {
    setup_mongodb();
    setup_routes(server);
}

export default setup_app;