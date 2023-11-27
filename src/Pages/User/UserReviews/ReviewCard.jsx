import { Button } from "@mui/material";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAccessUserReview from "../../../Hooks/useAccessUserReview";

const ReviewCard = ({ data }) => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { refetch } = useAccessUserReview();

    const handleDeleteReview = () => {
        axiosSecure.delete(`/user-reviews/${data?._id}?email=${user?.email}`)
        .then(() => {
            toast.success("Deleted successfully!");
            refetch();
        }).catch(err => {
            toast.error(err.message);
        })
    }

    return (
        <div className="bg-slate-700 text-white py-6 md:px-8 px-5 rounded-lg shadow-xl flex flex-col justify-between gap-5">
            <div>
                <h1 className="title-text md:text-lg text-base font-medium">Property Title : {data.property_title}</h1>
                <p className="py-2 md:text-sm text-xs">{data?.review_date}</p>
                <div>
                    <p className="underline md:text-sm text-xs text-cyan-300">Agent Name : {data?.property_agent}</p>

                    <p className="mt-5 mb-1 font-bold title-text">Description:-</p>
                    <p className="italic md:text-sm text-xs">
                        {data?.review_description}
                    </p>
                </div>
            </div>

            <div>
                <Button onClick={handleDeleteReview} variant="contained" color="error">Delete</Button>
            </div>
        </div>
    );
};

export default ReviewCard;

ReviewCard.propTypes = {
    data: PropTypes.object
}