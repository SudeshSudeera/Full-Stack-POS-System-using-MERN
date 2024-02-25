import axios, { AxiosInstance } from "axios";
import BASE_URL from "../Config/apiConfig";

const instance:AxiosInstance = axios.create({
    baseURL: BASE_URL
});

axios.interceptors.request.use(
    (config) => {
        let token = document.cookie.split(': ')
            .find((record)=>{record.startsWith('token=')}) || '';
        token = token?.split('=')[1];
        config.headers.Authorization=token;
        return config;
    },
    (error)=> {return Promise.reject(error)}
);

export default instance;