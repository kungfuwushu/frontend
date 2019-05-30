import axios, { AxiosRequestConfig } from "axios";

const API_ROOT = process.env.REACT_APP_API_ADDRESS;

const responseData = (res: any) => res.data;

export const get = (url: string, config?: AxiosRequestConfig) => {
    return axios.get(`${API_ROOT}${url}`, config).then(responseData);
}

export const post = (url: string, data: any, config?: AxiosRequestConfig) => {
    return axios.post(`${API_ROOT}${url}`, data, config).then(responseData);
}

export const put = (url: string, data?: any, config?: AxiosRequestConfig) => {
    return axios.put(`${API_ROOT}${url}`, data || undefined, config).then(responseData);
};

export const del = (url: string) => axios.delete(`${API_ROOT}${url}`).then(responseData);
