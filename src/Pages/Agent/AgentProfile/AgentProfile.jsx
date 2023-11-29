import { Helmet } from "react-helmet";
import useAuth from "../../../Hooks/useAuth";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { EditNote } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { updateProfile } from "firebase/auth";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AgentProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { userRole, userInfo, user } = useAuth();
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    const axiosSecure = useAxiosSecure();

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setUserName(userInfo?.name);
        setUserImage(userInfo?.image);
    }, [userInfo]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async (data) => {
        const updateProfileId = toast.loading("Updating profile...");
        let imageLink = userInfo?.image;

        const name = data.name;
        const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        if (data.image.length > 0) {
            const imageFile = { image: data?.image[0] };

            const res = await axios.post(image_hosting_api, imageFile, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            imageLink = res?.data?.data?.display_url;
        }

        // /update-profile/:id
        updateProfile(user, {
            displayName: name,
            photoURL: imageLink
        }).then(() => {
            axiosSecure.patch(`/update-profile/${userInfo?._id}?email=${userInfo?.email}`, { name: name, image: imageLink })
                .then(() => {
                    setUserName(name)
                    setUserImage(imageLink);

                    toast.success("Profile updated!", { id: updateProfileId });
                }).catch((err) => toast.error(err.message, { id: updateProfileId }))
        }).catch((err) => toast.error(err.message, { id: updateProfileId }))

        setOpen(false);
    }

    return (
        <div className="min-h-screen w-full md:px-10 px-5 md:py-16 py-5">
            <Helmet>
                <title>MATTER | Agent Profile</title>
            </Helmet>
            <div className="max-w-xl mx-auto bg-cyan-300 rounded-2xl shadow-xl py-8 flex justify-center flex-col items-center relative">
                <div className="md:py-5">
                    <img className="border-[20px] md:w-[150px] md:h-[150px] w-[90px] h-[90px] object-cover outline outline-[30px] outline-cyan-100 border-opacity-40 border-white rounded-full" src={userImage} alt="" />
                </div>

                <div className="text-center">
                    <h1 className="mt-8 md:text-3xl text-xl font-bold title-text">{userName}</h1>
                    <h3 className="capitalize mt-2 md:text-xl text-lg font-medium">Role: {userRole}</h3>
                </div>

                <div className="md:absolute md:mt-0 mt-5 right-5 top-5">
                    <button className="md:text-sm text-xs title-text font-medium  bg-white py-1 px-3" onClick={handleClickOpen}>
                        <EditNote></EditNote> Edit Profile
                    </button>

                    <Dialog open={open} onClose={handleClose}>
                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <DialogTitle>Edit your Profile</DialogTitle>
                            <DialogContent className="space-y-5">

                                <TextField id="filled-basic" {...register("name", { required: true })} label="Name" defaultValue={userName} variant="filled" /> <br />

                                {errors.name?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Name is required!</p>) : ""}

                                <div className="space-y-2">
                                    <InputLabel>Change profile image</InputLabel>
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload file
                                        <VisuallyHiddenInput {...register("image", { required: false })} type="file" />
                                    </Button>
                                </div>

                            </DialogContent>
                            <div className="flex justify-center gap-5">
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Update</Button>
                            </div>
                        </form>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default AgentProfile;