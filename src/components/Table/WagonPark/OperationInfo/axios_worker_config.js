// axiosConfig.js
import axios from 'axios';
import { getItem } from "@/helpers/persistanseStorage";

const config = {
    baseURL: 'http://10.20.0.43/api/'
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        const token = getItem('accessToken');
        config.headers.Authorization = token ? `Basic ${token}` : "";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default _axios;
