import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Box, CircularProgress, Container } from "@mui/material";
import PropertyCard from "../../Components/PropertyCard/PropertyCard";
import { Helmet } from "react-helmet";


const AllProperties = () => {
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["verifiedProperties"],
        queryFn: async () => {

            const result = await axiosSecure.get(`/properties`);
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
        <Container maxWidth="lg" className="mx-auto md:mb-32 mb-28">
            <Helmet>
                <title>MATTER | All Properties</title>
            </Helmet>
            <h1 className="md:mt-10 mt-5 md:text-5xl text-3xl font-bold text-center">All Properties</h1>


            <div className="md:mt-14 mt-10 grid md:grid-cols-2 grid-cols-1 gap-10">
                {
                    data?.map(item => <PropertyCard key={item._id} data={item}></PropertyCard>)
                }
            </div>
        </Container>
    );
};

export default AllProperties;