import axios from "./axios";
import { Axios, AxiosRequestConfig } from 'axios'

export const httpRequest = async<T>(config: AxiosRequestConfig): Promise<T> => {
    const finalConfig: AxiosRequestConfig = {
        responseType: "json",
        ...config
    };

    return new Promise<T>((resolve, reject) => {
        axios.request<T>(finalConfig)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    });
}