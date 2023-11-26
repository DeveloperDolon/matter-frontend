import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import toast from "react-hot-toast";


const useWishlistMutation = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    return useMutation({
        mutationFn: async (wishListData) => {
            return axiosSecure.post(`/users-wishlist?email=${user?.email}`, {...wishListData});
        },
        onSuccess: () => {
            toast.success("Property added successfully!");
        },
        onError:(error) => {
            toast.error(error.message);
        }
    })
};

export default useWishlistMutation;