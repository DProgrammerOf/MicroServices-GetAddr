import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ResponseHandler<T> {
    code: number;
    message?: string;
    data?: T;
}

export default async function tryAxios<T>(config: AxiosRequestConfig): Promise<ResponseHandler<T>> {
    try {
        const response: AxiosResponse<T> = await axios.request<T>(config);
        return { 
            code: response.status,
            data: response.data
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            return { 
                code: axiosError.response?.status || 0, 
                message: 'AxiosError: ' + axiosError.message
            };
        } else {
            return { 
                code: 0, 
                message: 'GenericError: ' + error.message
            };
        }
    }
}