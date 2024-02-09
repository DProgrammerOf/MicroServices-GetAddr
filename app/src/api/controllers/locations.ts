export default {
    get: async ( latitude: Number, longitude: Number ) => {
        console.log('(location) get called')
        return {
            success: true,
            message: 'location get'
        }
    },
    
    store: async ( latitude: Number, longitude: Number ) => {
        console.log('(location) store called')
        return {
            success: true,
            message: 'location store'
        }
    },

    update: async ( latitude: Number, longitude: Number ) => {
        console.log('(location) update called')
        return {
            success: true,
            message: 'location update'
        }
    },

    delete: async ( latitude: Number, longitude: Number ) => {
        console.log('(location) delete called')
        return {
            success: true,
            message: 'location delete'
        }
    }
}