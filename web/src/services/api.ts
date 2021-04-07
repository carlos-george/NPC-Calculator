import axios from 'axios';
import { history } from '../routes';


const api = axios.create({
    baseURL: process.env.BASE_URL ? process.env.BASE_URL : 'http://localhost:3333',
});

api.interceptors.request.use(async (config) => {

    const token = localStorage.getItem('@token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(undefined, error => {

    const { status, statusText } = error.response;

    if (status === 401 && statusText === 'Unauthorized') {
        localStorage.clear();
        history.push('/');
    }

    return Promise.reject(error);
});

export default api;