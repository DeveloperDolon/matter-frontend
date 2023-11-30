import {  Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./style.css"
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AnimativeText from "../AnimativeText/AnimativeText";


const LatestUsersReviews = () => {
    const axiosPublic = useAxiosPublic();

    const {data} = useQuery({
        queryKey: ["latest-reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/latest-user-reviews");

            return res.data;
        }
    })
    
    return (
        <Container maxWidth="lg" className="mx-auto md:my-32 my-24">

            <AnimativeText firstText={"Latest User Reviews"} className={"md:text-6xl text-3xl mb-16"} sectoundText={"What our client says?"}></AnimativeText>

            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    data?.map(item => <SwiperSlide key={item._id}>
                        <div>
                            <div className="flex justify-center flex-col items-center">
                                <img className="md:h-20 md:w-20 h-16 w-16 rounded-full object-cover" src={item.reviewer_image} alt="" />
                                <h1 className="mt-5 title-text md:text-2xl text-lg font-semibold">{item.reviewer_name}</h1>
                                <p>{item.review_date}</p>
                            </div>

                            <div className="flex justify-center items-center flex-col text-center">
                                <p className="mt-3 italic md:text-base text-sm font-medium">{item.review_description}</p>

                                <h5 className="md:text-lg text-base font-medium mt-4">Property : {item.property_title}</h5>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </Container>
    );
};

export default LatestUsersReviews;