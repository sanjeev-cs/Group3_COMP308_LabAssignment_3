import axios from 'axios';

// Create an Axios instance for API requests
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api', // Base URL from env or fallback
    withCredentials: true // Send cookies with requests
});

// Global response interceptor for error handling
api.interceptors.response.use(
    (response) => response, // Return response as is
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                console.error('Unauthorized'); // Handle auth issues globally
            }

            console.error(`API Error ${status}`, data); // Log server errors
        } else {
            console.error('Network Error or Server Unreachable'); // Handle network failures
        }

        return Promise.reject(error); // Forward error to caller
    }
);

export default api;
