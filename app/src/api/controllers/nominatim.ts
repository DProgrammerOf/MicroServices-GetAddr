import nominatim from '../../config/nominatim-api';
import tryAxios from '../../utils/handlers'

interface Address {
    road: string;
    farm: string;
    city_district: string;
    town: string;
    municipality: string;
    state_district: string;
    state: string;
    ISO3166_2_lvl4: string;
    region: string;
    country: string;
    country_code: string;
}

interface Place {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    category: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: Address;
    boundingbox: [string, string, string, string];
}

interface Status {
    status: number,
    message: string,
    data_updated: string,
    software_version: string,
    database_version: string
}

interface ResponseNominatim {
    success: boolean,
    message: string,
    data?: Status | Place | string,
}

export default {
    status: async (): Promise<ResponseNominatim> => {
        const request = await tryAxios<Status>({
            url: nominatim.URL+'/status?format=json',
            method: 'GET',
            headers: { responseType:'text', timeout:2000 }
        })
        return {
            success: request.code === 200 ?? false,
            message: '',
            data: request.data
        }
    },

    get: async ( latitude: number, longitude: number ): Promise<ResponseNominatim> => {
        const request = await tryAxios<Place>({
            url: nominatim.URL+'/reverse?format=json&lat='+latitude+'&lon='+longitude,
            method: 'GET',
            headers: { responseType:'text', timeout:2000 }
        })
        return {
            success: request.code === 200 ?? false,
            message: '',
            data: request.data
        }
    }
}