
import PropTypes from "prop-types";
import VerifiedIcon from '@mui/icons-material/Verified';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ data, condi = false }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/properties/${data?._id}`);
    }

    return (
        <div key={data?._id} className="bg-[#fafafa] shadow-xl overflow-hidden  rounded-xl">

            <div className="h-full flex flex-col justify-between">
                <div className="">
                    <div className="mb-5">
                        <img className="sm:h-[300px] h-[200px] w-full object-cover" src={data?.property_images[0]} alt="" />
                    </div>
                    <div className="px-5">
                        <div>
                            {
                                condi && <div className="pt-1 pb-2 flex gap-3 items-center">
                                    <img className="md:w-12 md:h-12 w-10 h-10 rounded-full object-cover" src={data?.agent_image} alt="" />
                                    <p className="md:text-base text-sm font-medium">{data?.agent_name}</p>
                                </div>
                            }
                        </div>
                        <h1 className="md:text-2xl font-bold">{data?.property_title}</h1>
                        <p className="md:text-base text-sm font-medium mt-2">{data?.property_location}</p>

                        <div className="flex justify-between items-center mt-5">
                            <p className="font-medium md:text-base text-sm">Price range : {data?.price_range} TK</p>
                            <p className="font-medium text-xs bg-green-500  text-white px-5 py-1 rounded-full whitespace-nowrap">
                                <VerifiedIcon fontSize="3" className="mr-1"></VerifiedIcon>
                                {data?.verified ? "Verified" : ""}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-5 px-6 pb-6">
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
    data: PropTypes.object,
    condi: PropTypes.bool
}