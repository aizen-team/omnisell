import axios from "axios";
import { HTTP_STATUS } from "@/constants/httpStatus";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response?.status ===
            HTTP_STATUS.UNAUTHORIZED
        ) {
            /* handle unauthorized */
        } else if (
            error.response?.status === HTTP_STATUS.FORBIDDEN
        ) {
            /* handle forbiden */
        } else {
            return Promise.reject(error);
        }
    }
);

export default axiosClient;
