import { LocationOn, Verified } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const WishlistPropertyCard = ({ data }) => {
    return (
        <div className="bg-[#fafafa] overflow-hidden shadow-xl flex flex-col justify-between rounded-lg">
            <div>
                <div>
                    <img className="lg:h-[250px] md:h-[200px] h-[150px] object-cover w-full" src={data?.property_images[0]} alt="" />
                </div>

                <div className="py-6 px-5">
                    <div className="flex flex-wrap sm:mb-0 mb-3 justify-between">
                        <div className="flex items-center gap-3 mb-3">
                            <img className="md:w-10 w-7 rounded-full" src={data?.agent_image} alt="" />
                            <h5 className="md:text-sm text-xs font-semibold">{data?.agent_name}</h5>
                        </div>

                        <div>
                            <p className="bg-green-500 w-fit md:text-sm text-xs font-medium py-1 px-3 rounded-full text-white"><Verified className="mr-1"></Verified>{data?.verified ? "Verified" : ""}</p>
                        </div>
                    </div>

                    <h4 className="md:text-lg text-base font-medium  title-text">Property Name : {data?.property_title}</h4>

                    <p className="md:text-sm text-xs py-2"><LocationOn></LocationOn> {data?.property_location}</p>

                    <p className="md:text-base text-sm font-medium">Price range : {data?.price_range} TK</p>
                </div>
            </div>

            <div className="pb-6 px-5 flex flex-wrap gap-3 justify-between">
                <Button variant="contained">Make Offer</Button>

                <Button variant="contained" color="error">
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default WishlistPropertyCard;

WishlistPropertyCard.propTypes = {
    data: PropTypes.object
}