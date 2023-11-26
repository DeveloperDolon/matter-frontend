import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAccessPropertyReviews = (id) => {
   const {user} = useAuth();
   const axiosSecure = useAxiosSecure();
   
    return useQuery({
        queryKey: ["access-property-review"],
        queryFn: async () => {
            const rawData = await axiosSecure.get(`/property-reviews/${id}?email=${user?.email}`);
            const response = rawData.data;
        
            return response;
        }

    })
};

export default useAccessPropertyReviews;