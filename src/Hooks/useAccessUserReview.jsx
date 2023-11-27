import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAccessUserReview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["user-reviews"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-reviews?email=${user?.email}`);

            return response.data;
        }
    })
};

export default useAccessUserReview;