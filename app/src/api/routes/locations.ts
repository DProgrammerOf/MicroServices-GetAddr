import express, { Router } from "express"
import locations from '../controllers/locations'
import { resolve } from "path";

const router = express.Router();

router.get('/get', async (request, response) => {
    const location =  await locations.get(1,2);
    response.status(200).json(location);
})

router.get('/store', async (request, response) => {
    const location =  await locations.store(1,2);
    response.status(200).json(location);
})

router.get('/update', async (request, response) => {
    const location =  await locations.update(1,2);
    response.status(200).json(location);
})

router.get('/delete', async (request, response) => {
    const location =  await locations.delete(1,2);
    response.status(200).json(location);
})

export default router;