import express from 'express'
import locations from './api/routes/locations'
import nominatim from './api/routes/nominatim'

// Microservice start
const app = express()
app.use(express.json())

// Routes
app.use('/location', locations)
app.use('/nominatim', nominatim)
app.use((request, response) => response.status(404).json({success: false, message: 'Route not found'}))

export default app;