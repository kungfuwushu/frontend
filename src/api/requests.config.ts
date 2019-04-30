import axios from "axios";

const API_ROOT = process.env.REACT_APP_API_ADDRESS;

const responseData = (res: any) => res.data;

export const get = (url: string) => axios.get(`${API_ROOT}${url}`).then(responseData);

export const post = (url: string, data: any, headers?: any) => {
    return axios.post(`${API_ROOT}${url}`, data, headers).then(responseData);
}

export const put = (url: string, data?: any) => {
    if (data)
        return axios.put(`${API_ROOT}${url}`, data).then(responseData);
    return axios.put(`${API_ROOT}${url}`).then(responseData);
};

export const del = (url: string) => axios.delete(`${API_ROOT}${url}`).then(responseData);
