import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

instance.interceptors.request.use((config:any) => {
    const token:string | null = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
