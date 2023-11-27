import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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

const AddProperty = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const {mutate} = useMutation({
        mutationFn: (propertyData) => {
            return axiosSecure.post(`/property?email=${user?.email}`, {...propertyData});
        },
        onSuccess: () => {
            toast.success("Property successfully added!");
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })


    const onSubmit = async (data) => {
        const lowerPrice = parseFloat(data.price_range_from);
        const upperPrice = parseFloat(data.price_range_to);

        const imageFile = {image: data?.property_image[0]};

        if (lowerPrice >= upperPrice) {
            return toast.error("Your price range is not valid!");
        }

        const res = await axios.post(image_hosting_api, imageFile,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const imageUrl = res?.data?.data?.display_url;
        

        const propertyData = {
            property_title: data.property_title,
            property_location: data.property_location,
            property_images: [imageUrl],
            agent_name: user?.displayName,
            agent_email: user?.email,
            agent_image: user?.photoURL ? user?.photoURL : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            price_range: `${lowerPrice}-${upperPrice}`,
            overview: [
                {
                    bed_room: data.bed_room,
                    bath_room: data.bath_room,
                    garage: data.garage,
                    area: data.area,
                    lot_size: data.lot_size
                }
            ]

        }

        mutate(propertyData);
    }

    return (
        <div>
            <Helmet>
                <title>MATTER | Add Property</title>
            </Helmet>

            <div className="w-full md:px-10 px-5 md:py-10 py-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full bg-white p-10">
                        <h1 tabIndex={0} role="heading" aria-label="profile information" className="focus:outline-none text-3xl font-bold title-text text-gray-800">
                            Add Property
                        </h1>
                        <p role="contentinfo" className=" focus:outline-nonetext-sm font-light leading-tight text-gray-600 mt-4 title-text">
                            Fill in the data for the property. It will take a couple of minutes. <br />
                            You only need a passport
                        </p>
                        <h2 role="heading" aria-label="enter Personal data" className="text-xl font-semibold leading-7 text-gray-800 mt-10">
                            Property Data
                        </h2>

                        <div className="mt-8 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Property title</label>
                                <input {...register("property_title", { required: true })} type="text" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input property title" />
                                {errors.property_title?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Property title is required!</p>) : ""}
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Property Location</label>
                                <input
                                    {...register("property_location", { required: true })}
                                    type="text" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Property location here" />
                                {errors.property_location?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Property location is required!</p>) : ""}
                            </div>
                        </div>
                        <div className="mt-12 md:flex items-center">
                            <div className="flex flex-col gap-3">
                                <label className="mb-3 text-sm leading-none text-gray-800">Property Image</label>
                                <Button className="w-64" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload file
                                    <VisuallyHiddenInput
                                        {...register("property_image", { required: true })}
                                        type="file" />
                                </Button>
                                {errors.property_image?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Property image is required!</p>) : ""}
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Agent name</label>
                                <input type="text" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={user?.displayName} readOnly />
                            </div>
                        </div>
                        <div className="mt-8 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Number of bed room </label>
                                <input {...register("bed_room", { required: true })} type="number" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input number of bedroom" />
                                {errors.bed_room?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Number of bed room is required!</p>) : ""}
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Number of bathroom</label>
                                <input
                                    {...register("bath_room", { required: true })}
                                    type="number" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input number of bathroom" />
                                {errors.bath_room?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Number of bathroom is required!</p>) : ""}
                            </div>
                        </div>
                        <div className="mt-8 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Number of garage </label>
                                <input {...register("garage", { required: true })} type="number" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input number of garage" />
                                {errors.garage?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Number of garage is required!</p>) : ""}
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Area</label>
                                <input
                                    {...register("area", { required: true })}
                                    type="number" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input area" />
                                {errors.area?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Area is required!</p>) : ""}
                            </div>
                        </div>
                        <div className="mt-12 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Agent email</label>
                                <input type="email" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" value={user?.email} readOnly />
                            </div>
                            <div className="flex flex-col md:ml-12 md:mt-0 mt-8">
                                <label className="mb-3 text-sm leading-none text-gray-800">Price range (TK)</label>
                                <div className="grid grid-cols-2 w-64 gap-3">
                                    <input type="number"
                                        {...register("price_range_from", { required: true })}
                                        tabIndex={0} className=" bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="From" />

                                    <input type="number"
                                        {...register("price_range_to", { required: true })}
                                        tabIndex={0} className="bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="To" />
                                </div>
                                {errors.price_range_from?.type === "required" || errors.price_range_to?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Price range is required!</p>) : ""}
                            </div>
                        </div>

                        <div className="mt-8 md:flex items-center">
                            <div className="flex flex-col">
                                <label className="mb-3 text-sm leading-none text-gray-800">Lot size (Katha)</label>
                                <input {...register("lot_size", { required: true })} type="number" tabIndex={0} className="w-64 bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200" placeholder="Input lot size" />
                                {errors.lot_size?.type === "required" ? (<p className="text-red-500 md:text-sm text-xs ">Lot size is required!</p>) : ""}
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button type="submit" variant="contained" size="large" color="secondary">Add Property</Button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddProperty;