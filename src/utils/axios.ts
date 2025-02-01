// src/utils/axios.ts
import axios from 'axios';
import { handleError } from './errorHandler';

/**
 * 自定義 Axios 實例
 */
const axiosInstance = axios.create({
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

// 智能請求攔截器
axiosInstance.interceptors.request.use(
    config => {
        console.log(`[API Request] ${config.url}`);
        return config;
    },
    error => {
        handleError(error, '請求攔截器');
        return Promise.reject(error);
    }
);

// 智能回應攔截器
axiosInstance.interceptors.response.use(
    response => {
        console.log(`[API Response] ${response.config.url}`);
        return response;
    },
    error => {
        handleError(error, '回應攔截器');
        return Promise.reject(error);
    }
);

export default axiosInstance;
