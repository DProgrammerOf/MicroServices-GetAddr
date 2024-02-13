import { Router } from "express"
import locations from '../controllers/locations'

const router = Router();

router.get('/get/:lat/:lon', async (request, response) => {
    const latitude = Number.parseFloat(request.params.lat.trim())
    const longitude = Number.parseFloat(request.params.lon.trim())
    const location =  await locations.get(latitude, longitude)
    response.status(200).json(location)
})

router.get('/all', async (request, response) => {
    const location =  await locations.all(0, 30)
    response.status(200).json(location)
})

router.post('/store', async (request, response) => {
    const latitude = Number.parseFloat(request.body.lat.trim())
    const longitude = Number.parseFloat(request.body.lon.trim())
    const info = request.body.info.trim()
    const location =  await locations.store(latitude, longitude, info)
    response.status(200).json(location)
})

router.post('/update', async (request, response) => {
    const id = request.body.id.trim()
    const info = request.body.info.trim()
    const location =  await locations.update(id, info)
    response.status(200).json(location)
})

router.get('/delete', async (request, response) => {
    const id = request.body.id.trim()
    const location =  await locations.delete(id)
    response.status(200).json(location)
})

export default router;