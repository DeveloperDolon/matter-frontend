
import PropTypes from "prop-types";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ data }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/properties/${data?._id}`);
    }

    return (
        <div key={data?._id} className="bg-[#fafafa] shadow-xl overflow-hidden rounded-xl">
            <div>
                <img className="sm:h-[300px] h-[200px] w-full object-cover" src={data?.property_images[0]} alt="" />
            </div>

            <div className="py-6 px-5">
                <h1 className="md:text-2xl font-bold">{data?.property_title}</h1>
                <p className="md:text-base text-sm font-medium mt-2">{data?.property_location}</p>

                <div className="flex justify-between items-center mt-5">
                    <p className="font-medium md:text-base text-sm">Price range : {data?.price_range} TK</p>
                    <p className="font-medium text-xs bg-green-500  text-white px-5 py-1 rounded-full whitespace-nowrap">
                        <VerifiedIcon fontSize="3" className="mr-1"></VerifiedIcon>
                        {data?.verified ? "Verified" : ""}
                    </p>
                </div>
                <div className="mt-5">
                    <Button onClick={handleViewDetails} variant="contained" size="medium">
                        Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

PropertyCard.propTypes = {
    data: PropTypes.object
}