import locations from '../../models/Locations'

export default {
    all: async ( offset: number, limit: number ) => {
        const addresses = await locations.find().skip(offset).limit(limit)
        console.log('(location) all called')
        return {
            success: true,
            message: 'location all',
            addresses
        }
    },

    get: async ( latitude: number, longitude: number ) => {
        const address = await locations.findOne({latitude, longitude})
        console.log('(location) get called')
        return {
            success: true,
            message: 'location get',
            address
        }
    },
    
    store: async ( latitude: number, longitude: number, info: string ) => {
        const address = await new locations({latitude, longitude, info})
        console.log('(location) store called')
        return {
            success: true,
            message: 'location store',
            address
        }
    },

    update: async ( id: string, info: string ) => {
        const address = await locations.findByIdAndUpdate(id, {info})
        console.log('(location) update called')
        return {
            success: true,
            message: 'location update',
            address
        }
    },

    delete: async ( object_id: string ) => {
        const status = await locations.findByIdAndDelete(object_id)
        console.log('(location) delete called')
        return {
            success: true,
            message: 'location delete',
            status
        }
    }
}