import {describe, expect, it } from '@jest/globals'
import request from 'supertest'
import app from '../src/app'


describe('NominatimService Testing', () => {
    // to test crud
    let location_obj = {
        lat: '-27.1289',
        lon: '-48.6093',
        display_name: 'Rua 234, Meia Praia, Itapema, Região Geográfica Imediata de Itajaí, Região Geográfica Intermediária de Blumenau, Santa Catarina, Região Sul, 88220-000, Brasil'
    };

    describe('endpoint: /nominatim/status', () => {
        it('validate response structure', async () => {
            const response = await request(app).get(`/nominatim/status`)
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
        })

        it('validate status', async () => {
            const response = await request(app).get(`/nominatim/status`)
            expect(response.type).toBe('application/json')
            expect(response.body.success).toBe(true)
            expect(response.body.data.status).toBe(0)
            expect(response.body.data.message).toBe('OK')
        })
    })

    describe('endpoint: /nominatim/get', () => {
        it('validate response structure', async () => {
            const response = await request(app).get(`/nominatim/get/${location_obj.lat}/${location_obj.lon}`)
            expect(response.type).toBe('application/json')
            expect(response.body).toHaveProperty('success')
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('data')
        })

        it('validate response structure', async () => {
            const response = await request(app).get(`/nominatim/get/${location_obj.lat}/${location_obj.lon}`)
            expect(response.type).toBe('application/json')
            expect(response.body.success).toBe(true)
            expect(response.body.data).not.toBe(null)
            expect(response.body.data.display_name).toBe(location_obj.display_name)
        })
    })
    
})