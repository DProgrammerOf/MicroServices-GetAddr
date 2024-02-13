import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import request from 'supertest'
import mongodb from '../src/utils/connect_mongo';
import app from '../src/app'

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
    describe('endpoint: /locations/get', () => {
        it('retrieve with JSON', async () => {
            const response = await request(app).get('/location/get/-27.0988/-46.9')
            expect(response.type).toBe('application/json')
        })

        it('retrieve with ResponseLocation', async () => {
            const response = await request(app).get('/location/get/-27.0988/-46.9')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('address')
        })

        it('retrieve location valid', async () => {
            const response = await request(app).get('/location/get/-27.0988/-46.9')
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
        it('retrieve with JSON', async () => {
            const response = await request(app).get('/location/all')
            expect(response.type).toBe('application/json')
        })

        it('retrieve with ResponseLocation', async () => {
            const response = await request(app).get('/location/all')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('address')
        })

        it('retrieve locations', async () => {
            const response = await request(app).get('/location/all')
            expect(response.statusCode).toBe(200)
            expect(response.body.success).toBe(true)
            expect(response.body.address).toBeInstanceOf(Array)
        })
    })
});