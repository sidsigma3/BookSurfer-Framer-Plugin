import axios from 'axios';
import { storage } from '../utils/storage';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: Number(import.meta.env.VITE_TIMEOUT) || 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to inject the API Key
apiClient.interceptors.request.use(
    async (config) => {
        const apiKey = await storage.get<string>('apiKey', '');
        if (apiKey) {
            config.headers['x-api-key'] = apiKey;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor for global error handling
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        return Promise.reject(message);
    }
);

export default apiClient;
