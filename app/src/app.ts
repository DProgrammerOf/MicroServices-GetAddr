import express from 'express';
import locations from './api/routes/locations'

// Microservice start
const app = express();

// Routes
app.use('/location', locations)
app.use((request, response) => response.status(404).json({success: false, message: 'Route not found'}))

export default app;