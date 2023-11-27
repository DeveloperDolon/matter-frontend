import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAccessUserReview from "../../../Hooks/useAccessUserReview";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewCard = ({ data }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch } = useAccessUserReview();
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

export default ReviewCard;

ReviewCard.propTypes = {
    data: PropTypes.object
}