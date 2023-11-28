import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAccessAllReviews from "../../../Hooks/useAccessAllReviews";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const ReviewCardAdmin = ({data}) => {

    const axiosSecure = useAxiosSecure();
    const {refetch} = useAccessAllReviews();
    const { user } = useAuth();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <div className="flex justify-center flex-col items-center">
                    <img className="md:w-24 md:h-24 w-16 h-16 rounded-full object-cover" src={data?.reviewer_image} alt="" />

                    <h3 className="text-white pt-5 md:text-2xl text-lg font-semibold title-text">{data?.reviewer_name}</h3>
                </div>

                <div>
                    <p className="mt-5 mb-1 font-bold title-text">Review:-</p>
                    <p className="italic md:text-sm text-xs">
                        {data?.review_description}
                    </p>
                </div>
            </div>

            <div>
                <React.Fragment>
                    <Button variant="contained" color="error" onClick={handleClickOpen}>
                        Delete
                    </Button>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure? Want to delete!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleDeleteReview}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    );
};

export default ReviewCardAdmin;

ReviewCardAdmin.propTypes = {
    data: PropTypes.object
}