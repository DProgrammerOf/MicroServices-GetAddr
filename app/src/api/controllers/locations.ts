import { ObjectId } from 'bson'
import locations, { LocationObj } from '../../models/Locations'

interface ResponseLocation {
    success: boolean,
    message: string,
    address: LocationObj[] | LocationObj
}

export default {
    all: async ( offset: number, limit: number ): Promise<ResponseLocation> => {
        const address = await locations.find().skip(offset).limit(limit)
        return {
            success: true,
            message: '',
            address
        }
    },

    get: async ( latitude: number, longitude: number ): Promise<ResponseLocation> => {
        const address = await locations.findOne({latitude, longitude})
        return {
            success: address ? true : false,
            message: '',
            address
        }
    },
    
    store: async ( id: ObjectId | null, latitude: number, longitude: number, info: string ): Promise<ResponseLocation> => {
        const new_location = id ? {_id: id, latitude, longitude, info} : {latitude, longitude, info}
        try {
            const address = (await (new locations(new_location)).save())
            return {
                success: true,
                message: '',
                address
            }
        } catch (error: any) {
            return {
                success: false,
                message: '',
                address: null
            }
        }
    },

    update: async ( id: string, data: Object ): Promise<ResponseLocation> => {
        const address_updated = await locations.findByIdAndUpdate(new ObjectId(id), data, {returnDocument:'after'})
        return {
            success: address_updated ? true : false,
            message: '',
            address: address_updated
        }
    },

    delete: async ( id: string ): Promise<ResponseLocation> => {
        const status = await locations.findByIdAndDelete(id)
        return {
            success: true,
            message: '',
            address: null
        }
    }
}