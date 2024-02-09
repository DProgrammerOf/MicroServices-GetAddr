import express from 'express'
import http_config from './config/http'
import setup_app from './app';

// init server
const server = express();
server.listen(http_config.PORT);
console.log('Server started');

// init app
setup_app(server);