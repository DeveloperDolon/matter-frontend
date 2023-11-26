import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import useAccessPropertyReviews from "./useAccessPropertyReviews";


const useReviewMutation = (id) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {refetch} = useAccessPropertyReviews(id);

    return useMutation({
        mutationFn: async (newReview) => {
            return axiosSecure.post(`/property-review?email=${user?.email}`, {...newReview});
        },
        onSuccess: () => {
            toast.success("Review added successfully!");
            refetch();
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })
};

export default useReviewMutation;