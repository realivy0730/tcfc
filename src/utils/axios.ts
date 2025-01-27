import axios from 'axios';

/**
 * 建立 axios 實例
 */
const axiosInstance = axios.create({
    timeout: 10000, // 請求超時時間
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * 請求攔截器
 */
axiosInstance.interceptors.request.use(
    (config) => {
        // 在發送請求之前做些什麼
        return config;
    },
    (error) => {
        // 對請求錯誤做些什麼
        return Promise.reject(error);
    }
);

/**
 * 回應攔截器
 */
axiosInstance.interceptors.response.use(
    (response) => {
        // 對回應資料做些什麼
        return response;
    },
    (error) => {
        // 對回應錯誤做些什麼
        return Promise.reject(error);
    }
);

export default axiosInstance;
