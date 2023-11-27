import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAccessWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    return useQuery({
        queryKey: ["user-wishlist"],
        queryFn: async () => {
            const response = await axiosSecure(`/users-wishlist?email=${user?.email}`);
            const result = response.data;
            
            return result;
        }
    })
};

export default useAccessWishlist;