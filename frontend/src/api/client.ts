import axios, { AxiosInstance } from "axios";

// Create an Axios instance with a base URL from environment variables
const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
});

export default client;
