
import { LocationOn } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Transition1 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const Transition2 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const AdvertisePropertyCard = ({ data, reload }) => {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {mutate} = useMutation({
        mutationFn: (condition) => {
            return axiosSecure.patch(`/admin-advertise-property/${data?._id}?email=${user?.email}`, {advertisement: condition});
        },
        onSuccess: (res) => {
            if(res?.data?.limitOver) {
                return toast.error("Your advertisement limit is over!");
            }
            reload();
            toast.success("Properties advertisement status updated!");
        },
        onError: (err) => {
            toast.error(err?.message);
        }
    });



    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    
    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleAddAdvertise = () => {
        setOpen1(false);
        
        mutate(true);
    }

    const handleRemoveAdvertise = () => {
        setOpen2(false);
        mutate(false);
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

                        <p className={`${data?.verified === "verified" ? "bg-blue-500" : data?.verified === "unknown" ? "bg-yellow-500" : "bg-red-500"} w-fit px-2 md:text-xs text-[10px] py-1 rounded-full text-white`}>{data?.verified === "verified" ? "Verified" : data?.verified === "unknown" ? "Pending..." : "Rejected"}</p>
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
                <React.Fragment>
                    <Button disabled={!data?.advertised} size="small" variant="contained" color="error" onClick={handleClickOpen2}>
                        Remove Advertise
                    </Button>
                    <Dialog
                        open={open2}
                        TransitionComponent={Transition1}
                        keepMounted
                        onClose={handleClose2}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure? Want to remove advertise it!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose2}>Disagree</Button>
                            <Button onClick={handleRemoveAdvertise}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
                
                <React.Fragment>
                    <Button disabled={data?.advertised} size="small" variant="contained" color="primary" onClick={handleClickOpen1}>
                        Advertise
                    </Button>
                    <Dialog
                        open={open1}
                        TransitionComponent={Transition2}
                        keepMounted
                        onClose={handleClose1}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Are you sure? Want to advertise it!"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose1}>Disagree</Button>
                            <Button onClick={handleAddAdvertise}>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
        </div>
    );
};

export default AdvertisePropertyCard;
AdvertisePropertyCard.propTypes = {
    data: PropTypes.object,
    reload: PropTypes.func
}