import express from 'express';
import mongodb from './utils/connect_mongo'
import config_http from './config/http'
import app from './app'

// connect to mongodb
mongodb.connect();

// start to http server
app.listen(config_http.PORT, () => {
    console.log('[server] listen on port ' + config_http.PORT);
});
