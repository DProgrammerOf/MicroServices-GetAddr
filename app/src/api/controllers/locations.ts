import locations from '../../models/Locations'

interface ResponseLocation {
    success: boolean,
    message: string,
    address: Object | Object[]
}

export default {
    all: async ( offset: number, limit: number ): Promise<ResponseLocation> => {
        const address = await locations.find().skip(offset).limit(limit)
        console.log('(location) all called')
        return {
            success: true,
            message: '',
            address
        }
    },

    get: async ( latitude: number, longitude: number ): Promise<ResponseLocation> => {
        console.log('(location) get called')
        const address = await locations.findOne({latitude, longitude})
        return {
            success: address ? true : false,
            message: '',
            address
        }
    },
    
    store: async ( latitude: number, longitude: number, info: string ): Promise<ResponseLocation> => {
        const address = await new locations({latitude, longitude, info})
        console.log('(location) store called')
        return {
            success: true,
            message: '',
            address
        }
    },

    update: async ( id: string, info: string ): Promise<ResponseLocation> => {
        const address = await locations.findByIdAndUpdate(id, {info})
        console.log('(location) update called')
        return {
            success: true,
            message: '',
            address
        }
    },

    delete: async ( object_id: string ): Promise<ResponseLocation> => {
        const status = await locations.findByIdAndDelete(object_id)
        console.log('(location) delete called')
        return {
            success: true,
            message: '',
            address: status
        }
    }
}