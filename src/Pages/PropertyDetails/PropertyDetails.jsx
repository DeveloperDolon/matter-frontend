
import { Button, Container } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";
import { Bathroom, BedroomParent, Favorite, LocationCity } from "@mui/icons-material";
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import MarginIcon from '@mui/icons-material/Margin';
import GarageIcon from '@mui/icons-material/Garage';
import VerifiedIcon from '@mui/icons-material/Verified';
import useAccessPropertyReviews from "../../Hooks/useAccessPropertyReviews";
import animationData from "../../../public/Animation - 1699287520981.json";
import Lottie from "lottie-react";
import ReviewForm from "./ReviewForm";



const PropertyDetails = () => {
    const data = useLoaderData();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const { data: reviews } = useAccessPropertyReviews(data?._id);

    return (
        <Container maxWidth="lg" className="mx-auto md:mb-32 mb-28">
            <div className="max-w-7xl mx-auto mt-16 w-full grid md:grid-cols-12 grid-cols-1 gap-5">
                <div className="md:col-span-8">
                    <h1 className="md:text-4xl text-2xl title-text font-bold">{data?.property_title}</h1>

                    <p className="mt-2 md:text-lg text-base font-medium mb-2 flex items-center gap-2">
                        <LocationCity></LocationCity>
                        {data?.property_location}
                    </p>

                    <div className="md:mb-5 mb-3 flex justify-between">
                        <p className="md:text-base text-sm font-medium italic">Agent Name : {data?.agent_name}</p>
                        <p className="bg-green-600 text-white md:text-base text-sm px-5 py-1 rounded-full flex gap-1 items-center">
                            <VerifiedIcon></VerifiedIcon>
                            Verified
                        </p>
                    </div>

                    <Carousel className="text-center md:min-h-screen mx-auto" showArrows={true} infiniteLoop={true} autoPlay={true} dynamicHeight={true}>
                        <div>
                            <img className="md:h-[calc(100vh-150px)] h-auto w-full object-cover" src={data?.property_images[0]} />
                        </div>
                        <div>
                            <img className="md:h-[calc(100vh-150px)] h-auto w-full object-cover" src={data?.property_images[1]} />
                        </div>
                        <div>
                            <img className="md:h-[calc(100vh-150px)] h-auto w-full object-cover" src={data?.property_images[2]} />
                        </div>
                    </Carousel>

                    <div className="flex justify-between flex-wrap gap-5">
                        <div className="flex flex-col justify-center items-center py-5 px-3 bg-slate-800 text-white rounded-lg shadow-lg gap-2">
                            <p className="md:text-base text-sm font-semibold">Bedrooms</p>
                            <p className="md:text-base text-sm font-semibold">
                                <BedroomParent className="mr-2"></BedroomParent>
                                {data?.overview[0].bed_room}
                            </p>
                        </div>

                        <div className="flex flex-col justify-center items-center py-5 px-3 bg-slate-800 text-white rounded-lg shadow-lg gap-2">
                            <p className="md:text-base text-sm font-semibold">Bathroom</p>
                            <p className="md:text-base text-sm font-semibold">
                                <Bathroom className="mr-2"></Bathroom>
                                {data?.overview[0].bath_room}
                            </p>
                        </div>

                        <div className="flex flex-col justify-center items-center py-5 px-3 bg-slate-800 text-white rounded-lg shadow-lg gap-2">
                            <p className="md:text-base text-sm font-semibold">Area</p>

                            <p className="md:text-base text-sm font-semibold">
                                <ViewComfyIcon className="mr-2"></ViewComfyIcon>
                                {data?.overview[0].area}
                            </p>
                        </div>

                        <div className="flex flex-col justify-center items-center py-5 px-3 bg-slate-800 text-white rounded-lg shadow-lg gap-2">
                            <p className="md:text-base text-sm font-semibold">Lot size</p>
                            <p className="md:text-base text-sm font-semibold">
                                <MarginIcon className="mr-2"></MarginIcon>
                                {data?.overview[0].lot_size}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center py-5 px-3 bg-slate-800 text-white rounded-lg shadow-lg gap-2">
                            <p className="md:text-base text-sm font-semibold">Garage</p>
                            <p className="md:text-base text-sm font-semibold">
                                <GarageIcon className="mr-2"></GarageIcon>
                                {data?.overview[0].garage}
                            </p>
                        </div>
                    </div>

                    <div className="md:mt-10 mt-6">
                        <h2 className="md:text-2xl text-lg font-medium">
                            Discover the epitome of contemporary living in this stylish {data?.overview[0]?.bed_room} bedroom flat located in the heart of {data?.property_location}.
                        </h2>

                        <p className="md:mt-3 mt-2">
                            Meticulously designed and thoughtfully laid out, this residence offers a perfect blend of comfort, convenience, and sophistication.

                            Key Features:

                            Open Concept Design: Step into a bright and airy living space that seamlessly connects the living, dining, and kitchen areas. The open layout creates a welcoming atmosphere, perfect for both relaxation and entertaining.

                            Sleek Gourmet Kitchen: The chef-inspired kitchen is equipped with modern appliances, ample storage, and a sleek countertop. Cooking becomes a joy in this well-designed culinary space.

                            Tranquil Bedrooms: Unwind in the tranquility of the {data?.overview[0]?.bed_room} well-appointed bedrooms. Each room is a retreat, featuring  windows, built-in storage, etc.
                        </p>
                    </div>

                    <div>
                        <h4 className="md:mt-7 mt-5 md:text-2xl text-lg font-bold border-2 border-cyan-400 rounded-full py-2 px-5 w-fit md:mb-8 mb-4">Price Range : {data?.price_range} TK</h4>

                        <Button variant="contained" size="large">
                            Add To Wishlist
                            <Favorite className="ml-2"></Favorite>
                        </Button>
                    </div>

                    <div className="mt-16">
                        <h1 className="md:text-4xl text-3xl font-bold">Latest Customer Reviews</h1>

                        <div>
                            {
                                reviews?.length > 0 ?
                                    ""
                                    :
                                    <div>
                                        <Lottie
                                            className="md:w-[30%] w-[80%] mx-auto"
                                            options={defaultOptions}
                                            animationData={animationData}
                                            height={200}
                                            width={200}
                                        ></Lottie>
                                        <h2 className="md:text-2xl text-lg font-medium text-center title-text text-red-400">There have no reviews!</h2>
                                    </div>
                            }
                        </div>


                        <div>
                           <ReviewForm></ReviewForm>
                        </div>

                    </div>
                </div>

                <div className="md:col-span-4">
                    Their will some feature in future.
                </div>
            </div>
        </Container>
    );
};

export default PropertyDetails;