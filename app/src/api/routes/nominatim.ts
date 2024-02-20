import { Router } from "express"
import nominatim from '../controllers/nominatim'
import utilsRequests from '../../utils/requests'

const router = Router();

router.get('/status', async (request, response) => {
    const status =  await nominatim.status()
    response.status(200).json(status)
})


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
            const location =  await nominatim.get(latitude, longitude)
            response.status(200).json(location)
        }
    )
})

router.use((request, response) => response.status(404).json({message:'route invalid'}))

export default router;