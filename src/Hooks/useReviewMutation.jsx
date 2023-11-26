import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import toast from "react-hot-toast";


const useReviewMutation = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    return useMutation({
        mutationFn: async (newReview) => {
            return axiosSecure.post(`/property-review?email=${user?.email}`, {...newReview});
        },
        onSuccess: () => {
            toast.success("Review added successfully!")
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
};

export default useReviewMutation;