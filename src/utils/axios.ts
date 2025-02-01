
import axios from 'axios';
import { handleError } from './errorHandler';

const axiosInstance = axios.create({...});

// 完整攔截器實作...
export default axiosInstance;
