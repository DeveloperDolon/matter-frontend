import { LocationOn } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAccessAgentProperties from "../../../Hooks/useAccessAgentProperties";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const AddedPropertyCard = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch} = useAccessAgentProperties();
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveProperty = (id) => {
        
        setOpen(false);
        axiosSecure.delete(`/agent-properties/${id}?email=${user?.email}`)
            .then(() => {
                toast.success("Property removed from wishlist!");
                refetch();
            }).catch(err => {
                toast.error(err.message);
            })

    }

    const handleNavigateUpdate = (id) => {
        navigate(`/agent-dashboard/property-update/${id}`);
    }

    return (
        <div className="bg-cyan-100 shadow-xl overflow-hidden rounded-xl flex flex-col justify-between">
            <div>
                <div>
                    <img className="lg:h-[300px] object-cover  sm:h-[250px] h-[200px] w-full" src={data?.property_images[0]} alt="" />
                </div>

                <div className="p-6 pb-0">
                    <div className="flex justify-between items-center gap-4 flex-wrap">
                        <div className="flex gap-3 pb-3 items-center">
                            <img className="md:w-10 md:h-10 h-7 outline outline-blue-500 outline-2 w-7 rounded-full object-cover" src={data?.agent_image} alt="" />
                            <p className="md:text-sm text-xs font-semibold">{data?.agent_name}</p>
                        </div>

                        <p className={`${data?.verified === "verified" ? "bg-blue-500" :  data?.verified === "unknown" ? "bg-yellow-500" : "bg-red-500"} w-fit px-2 md:text-xs text-[10px] py-1 rounded-full text-white`}>{data?.verified === "verified" ? "Verified" :  data?.verified === "unknown" ? "Pending..." : "Rejected"}</p>
                    </div>

                    <h2 className="md:text-xl text-lg font-medium title-text">Title : {data?.property_title}</h2>

                    <p className="md:text-sm text-xs py-2">
                        <LocationOn></LocationOn>
                        {data?.property_location}
                    </p>
                    <p className="md:text-sm text-xs font-semibold">
                        Price Range : {data?.price_range} TK
                    </p>
                </div>
            </div>

            <div className="p-6 flex justify-between gap-5 flex-wrap">
                
                    <Button onClick={() => handleNavigateUpdate(data?._id)}  disabled={data?.verified === "rejected"} variant="contained" size="small">Update</Button>
                <React.Fragment>
                    <Button disabled={data?.verified === "rejected"} variant="contained" color="error" onClick={handleClickOpen}>
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
                            <Button onClick={() => handleRemoveProperty(data?._id)}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    );
};

export default AddedPropertyCard;

AddedPropertyCard.propTypes = {
    data: PropTypes.object
}