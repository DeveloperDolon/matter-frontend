import {  Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const LatestUsersReviews = () => {
    const axiosPublic = useAxiosPublic();

    const {data} = useQuery({
        queryKey: ["latest-reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/latest-user-reviews");

            return res.data;
        }
    })
    console.log(data);
    return (
        <Container maxWidth="lg" className="mx-auto md:my-32 my-24">
            
        </Container>
    );
};

export default LatestUsersReviews;