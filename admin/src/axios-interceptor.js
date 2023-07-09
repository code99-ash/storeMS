import axios from 'axios'

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth-token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        // console.log(config.headers)
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance