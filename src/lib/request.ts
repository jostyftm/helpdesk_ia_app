import axios from "./axios";
import { Axios, AxiosRequestConfig } from 'axios'

export const httpRequest = async<T>({
    url,
    method,
    data,
    params,
    responseType = "json"
}: AxiosRequestConfig): Promise<T> => {
    const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
        responseType
    }

    return new Promise<T>((resolve, reject) => {
        axios.request<T>(config)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    });
}