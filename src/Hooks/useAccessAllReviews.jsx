import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAccessAllReviews = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    return useQuery({
        queryKey: ["all-reviews"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-user-reviews?email=${user?.email}`);
            return res.data;
        }
    })
};

export default useAccessAllReviews;