import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://matter-backend-server.vercel.app",
    withCredentials: true
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;