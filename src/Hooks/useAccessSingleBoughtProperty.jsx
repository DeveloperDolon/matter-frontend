import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAccessSingleBoughtProperty = (id) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();


    return useQuery({
        queryKey: ["get-single-bought-property"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-bought-property/${id}?email=${user?.email}`);

            return res.data;
        }
    })
};

export default useAccessSingleBoughtProperty;

PropTypes.propTypes = {
    id: PropTypes.string
}