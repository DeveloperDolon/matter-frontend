
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Box, CircularProgress, Container, FormControl, InputLabel, Select } from "@mui/material";
import PropertyCard from "../../Components/PropertyCard/PropertyCard";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


const AllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sort, setSort] = useState(null);


    useEffect(() => {
        axiosSecure.get(`/properties?searchQuery=${searchQuery}&sort=${sort}`)
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }, [searchQuery, sort]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', height: "100vh", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </Box>
    }

    const handleSort = (e) => {
        
        if(e.target.value === "asc") {
            setSort(1);
        } else if(e.target.value === "desc") {
            setSort(-1);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.value;
        setSearchQuery(search);
    }

    return (
        <Container maxWidth="lg" className="mx-auto md:mb-32 mb-28">
            <Helmet>
                <title>MATTER | All Properties</title>
            </Helmet>
            <h1 className="md:mt-10 mt-5 md:text-5xl text-3xl font-bold text-center">All Properties</h1>

            <div className="md:mt-10 mt-7 grid md:grid-cols-2 grid-cols-1 gap-10">
                <Paper
                    onChange={handleSearch}
                    className="w-full"
                    component="form"
                    sx={{ p: '5px 8px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by property title"
                        name="search_field"
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>

                <div>
                    <FormControl className="w-full">
                        <InputLabel htmlFor="grouped-native-select">Filter with price range</InputLabel>
                        <Select onChange={handleSort} native defaultValue="" className="w-full" id="grouped-native-select" label="Grouping">
                            <option aria-label="None" value="" />
                            <option value={"asc"}>Low to high</option>
                            <option value={"desc"}>High to low</option>
                        </Select>
                    </FormControl>
                </div>
            </div>


            <div className="md:mt-14 mt-10 grid md:grid-cols-2 grid-cols-1 gap-10">
                {
                    data?.map(item => <PropertyCard key={item._id} data={item} condi={true}></PropertyCard>)
                }
            </div>
        </Container>
    );
};

export default AllProperties;