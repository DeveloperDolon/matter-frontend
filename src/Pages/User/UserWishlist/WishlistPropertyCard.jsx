import { LocationOn, Verified } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useAccessWishlist from "../../../Hooks/useAccessWishlist";
import toast from "react-hot-toast";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const WishlistPropertyCard = ({ data, wishlist_id }) => {
    const {user} = useAuth();
    const [open, setOpen] = React.useState(false);
    const axiosSecure = useAxiosSecure();
    const {refetch} = useAccessWishlist();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToWishlist = () => {

        setOpen(false);
        axiosSecure.delete(`/users-wishlist/${wishlist_id}?email=${user?.email}`)
        .then(() => {
            toast.success("Property removed from wishlist!");
            refetch();
        }).catch(err => {
            toast.error(err.message);
        })

    }

    return (
        <div className="bg-[#fafafa] overflow-hidden shadow-xl flex flex-col justify-between rounded-lg">
            <div>
                <div>
                    <img className="lg:h-[250px] md:h-[200px] h-[150px] object-cover w-full" src={data?.property_images[0]} alt="" />
                </div>

                <div className="py-6 px-5">
                    <div className="flex flex-wrap sm:mb-0 mb-3 justify-between">
                        <div className="flex items-center gap-3 mb-3">
                            <img className="md:w-10 w-7 rounded-full" src={data?.agent_image} alt="" />
                            <h5 className="md:text-sm text-xs font-semibold">{data?.agent_name}</h5>
                        </div>

                        <div>
                            <p className="bg-green-500 w-fit md:text-sm text-xs font-medium py-1 px-3 rounded-full text-white"><Verified className="mr-1"></Verified>{data?.verified ? "Verified" : ""}</p>
                        </div>
                    </div>

                    <h4 className="md:text-lg text-base font-medium  title-text">Property Name : {data?.property_title}</h4>

                    <p className="md:text-sm text-xs py-2"><LocationOn></LocationOn> {data?.property_location}</p>

                    <p className="md:text-base text-sm font-medium">Price range : {data?.price_range} TK</p>
                </div>
            </div>

            <div className="pb-6 px-5 flex flex-wrap gap-3 justify-between">
                <Button variant="contained">
                    Make Offer
                </Button>

                <React.Fragment>
                    <Button variant="contained" color="error" size="large" onClick={handleClickOpen}>
                        Remove
                    </Button>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure? Want to remove it!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={handleAddToWishlist}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    );
};

export default WishlistPropertyCard;

WishlistPropertyCard.propTypes = {
    data: PropTypes.object,
    wishlist_id: PropTypes.string,
}