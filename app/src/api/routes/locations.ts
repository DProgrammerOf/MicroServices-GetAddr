import { Router } from "express"
import locations from '../controllers/locations'
import utilsRequests from '../../utils/requests'

const router = Router();

router.get('/get/:lat/:lon', async (request, response) => {
    const params = [
        { name:'lat', type:'string' },
        { name:'lon', type:'string' }
    ]
    return utilsRequests.validation(
        request.params, 
        params,
        (error) => response.status(200).json(error),
        async () => {
            const latitude = Number(request.params.lat.trim())
            const longitude = Number(request.params.lon.trim())
            const location =  await locations.get(latitude, longitude)
            response.status(200).json(location)
        }
    )
})

router.get('/all', async (request, response) => {
    const location =  await locations.all(0, 30)
    response.status(200).json(location)
})

router.post('/store', async (request, response) => {
    const params = [
        { name:'lat', type:'string' },
        { name:'lon', type:'string' },
        { name:'info', type:'string' }
    ]
    return utilsRequests.validation(
        request.body,
        params,
        (error) => response.status(200).json(error),
        async () => {
            const latitude = Number(request.body.lat.trim())
            const longitude = Number(request.body.lon.trim())
            const info = request.body.info.trim()
            const id = request.body.id ?? null;
            const store = await locations.store(id, latitude, longitude, info) 
            response.status(200).json(store)
        }
    )
})

router.put('/update', async (request, response) => {
    const params = [
        { name:'id', type:'string' },
        { name:'data', type:'object' }
    ]
    return utilsRequests.validation(
        request.body,
        params,
        (error) => response.status(200).json(error),
        async () => {
            const id = request.body.id
            const data = request.body.data
            const updated =  await locations.update(id, data)
            response.status(200).json(updated)
        }
    )
})

router.post('/delete', async (request, response) => {
    const params = [
        { name:'id', type:'string' }
    ]
    return utilsRequests.validation(
        request.body,
        params,
        (error) => response.status(200).json(error),
        async () => {
            const id = request.body.id;
            const deleted = await locations.delete(id) 
            response.status(200).json(deleted)
        }
    )
})

router.use((request, response) => response.status(404).json({message:'route invalid'}))

export default router;