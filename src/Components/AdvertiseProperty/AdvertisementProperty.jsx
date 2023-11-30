
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import PropertyCard from "../PropertyCard/PropertyCard";
import { Link } from "react-router-dom";
import "../style.css";
import AnimativeText from "../AnimativeText/AnimativeText";

const AdvertisementProperty = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    


    const { data, isLoading } = useQuery({
        queryKey: ["verifiedProperties", user],
        queryFn: async () => {

            const result = await axiosSecure.get(`/advertised-properties`);
            const propertiesData = result.data;

            return propertiesData;
        }
    })


    if (isLoading) {
        return <Box sx={{ display: 'flex', height: "100vh", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </Box>
    }

    return (
    <>
      <Container maxWidth="lg" className="mx-auto md:my-32 my-24">
      <AnimativeText firstText={"Advertisement Properties"} className={"md:text-6xl text-4xl"} sectoundText={"Our Advertisements"}></AnimativeText>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 mt-20">
                {
                    data.slice(0, 4)?.map(item => <PropertyCard key={item._id} data={item}></PropertyCard>)
                }
            </div>

            <div className="flex justify-center md:mt-14 mt-7">
                <Link to={"/properties"}>
                    <Button variant="contained" size="large">
                        View All Properties
                    </Button>
                </Link>
            </div>
        </Container>
        </>
    );
};

export default AdvertisementProperty;