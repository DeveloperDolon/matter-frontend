import axios from "axios";
import useAuth from "./useAuth";
import toast from "react-hot-toast";


export const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
})

const useAxiosSecure = () => {

    const {logOut} = useAuth();

    axiosSecure.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          // Check if the error is due to an unauthorized (401) response
          if (error.response && error.response.status === 401 || error.response.status === 403) {
            console.log(error.response);
            // Handle token-related errors here, such as refreshing the token or redirecting to login
            // logOut()
            // .then(() => {
            //     window.location.reload();
            //     toast.success("You are logged out!");
            // }).catch(err => console.log(err.message));

            console.error('Unauthorized: Token expired or invalid');
          }
      
          return Promise.reject(error);
        }
      );

    return axiosSecure;

};

export default useAxiosSecure;