import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import request from 'supertest'
import mongodb from '../src/utils/connect_mongo';
import app from '../src/app'
import { ObjectId } from 'bson';

beforeAll((done) => {
    mongodb.connect()
    .then(() => done())
    .catch((err) => done(err));
  })

afterAll((done) => {
    mongodb.disconnect()
    .then(() => done())
    .catch((err) => done(err));
})

describe('LocationsService Testing', () => {
    // to test crud
    let location_obj = {
        id: new ObjectId('45c631380a6078ce27c7692f'),
        lat: '-27.1289',
        lon: '-48.6093',
        info: 'Rua 240, 478 - Andorinha, Itapema - SC, 88220-000'
    };
    // to test update
    let new_location_obj = {
        latitude: '-5',
        longitude: '-5',
        info: 'Rua 244'
    }

    describe('endpoint: /locations/store', () => {
        it('validate response structure', async () => {
            const response = await request(app).post('/location/store').send({})
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success');
            expect(response.body).toHaveProperty('message');
        })

        it('retrieve with error request invalid', async () => {
            const response = await request(app).post('/location/store').send({})
            expect(response.body.success).toBe(false)
            expect(response.body.message).not.toHaveLength(0)
        })

        it('retrieve with success and new object', async () => {
            const response = await request(app).post('/location/store').send(location_obj)
            expect(response.body.success).toBe(true)
            expect(response.body.message).toHaveLength(0)
            expect(response.body).toHaveProperty('address');
            expect(response.body.address).not.toBeNull()
        })

        it('retrieve with error object duplicate', async () => {
            const response = await request(app).post('/location/store').send(location_obj)
            expect(response.body.success).toBe(false)
            expect(response.body.message).toHaveLength(0)
            expect(response.body.address).toBe(null)
        })
    })

    describe('endpoint: /locations/get', () => {
        it('validate response structure', async () => {
            const response = await request(app).get('/location/get/' + location_obj.lat + '/' + location_obj.lon)
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
        })

        it('retrieve location valid', async () => {
            const response = await request(app).get('/location/get/' + location_obj.lat + '/' + location_obj.lon)
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.address).not.toBeNull()
        })

        it('retrieve location invalid', async () => {
            const response = await request(app).get('/location/get/-0/-0')
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBe(false)
            expect(response.body.address).toBe(null)
        })
    })

    describe('endpoint: /locations/all', () => {
        it('validate response structure', async () => {
            const response = await request(app).get('/location/all')
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
        })

        it('retrieve locations', async () => {
            const response = await request(app).get('/location/all')
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.address).toBeInstanceOf(Array)
        })
    })

    describe('endpoint: /locations/update', () => {
        it('validate response structure', async () => { 
            const response = await request(app).put('/location/update').send({})
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
        })

        it('retrieve with error request invalid', async () => {
            const response = await request(app).put('/location/update').send({})
            expect(response.body.success).toBe(false)
            expect(response.body.message).not.toHaveLength(0)
        })

        it('retrieve with error location invalid', async () => {
            const response = await request(app).put('/location/update').send({
                id: 1,
                data: new_location_obj
            })
            expect(response.body.success).toBe(false)
            expect(response.body.message).not.toHaveLength(0)
        })

        it('retrieve with success and updated location', async () => {
            const response = await request(app).put('/location/update').send({
                id: location_obj.id, 
                data: new_location_obj
            })
            expect(response.body.success).toBe(true)
            expect(response.body.message).toHaveLength(0)
            expect(response.body.address).not.toBe(null)
            expect(response.body.address).toBeInstanceOf(Object)
            expect(response.body.address.latitude).toBe(Number(new_location_obj.latitude))
            expect(response.body.address.longitude).toBe(Number(new_location_obj.longitude))
            expect(response.body.address.info).toBe(new_location_obj.info)
        })
    })

    describe('endpoint: /locations/delete', () => {
        it('validate response structure', async () => { 
            const response = await request(app).post('/location/delete').send({})
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
        })

        it('retrieve with error request invalid', async () => {
            const response = await request(app).post('/location/delete').send({})
            expect(response.body.success).toBe(false)
            expect(response.body.message).not.toHaveLength(0)
        })

        it('retrieve with delete success', async () => {
            const response = await request(app).post('/location/delete').send({id:location_obj.id})
            expect(response.body.success).toBe(true)
            expect(response.body.message).toHaveLength(0)
        })
    })
});