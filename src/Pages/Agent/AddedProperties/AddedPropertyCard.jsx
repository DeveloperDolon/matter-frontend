import { LocationOn } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const AddedPropertyCard = ({ data }) => {


    return (
        <div className="bg-cyan-100 shadow-xl overflow-hidden rounded-xl flex flex-col justify-between">
            <div>
                <div>
                    <img className="lg:h-[300px] object-cover  sm:h-[250px] h-[200px] w-full" src={data?.property_images[0]} alt="" />
                </div>

                <div className="p-6 pb-0">
                    <div className="flex justify-between items-center gap-4 flex-wrap">
                        <div className="flex gap-3 pb-3 items-center">
                            <img className="md:w-10 md:h-10 h-7 outline outline-blue-500 outline-2 w-7 rounded-full object-cover" src={data?.agent_image} alt="" />
                            <p className="md:text-sm text-xs font-semibold">{data?.agent_name}</p>
                        </div>

                        <p className={`${data?.verified === "verified" ? "bg-blue-500" :  data?.verified === "unknown" ? "bg-yellow-500" : "bg-red-500"} w-fit px-2 md:text-xs text-[10px] py-1 rounded-full text-white`}>{data?.verified === "verified" ? "Verified" :  data?.verified === "unknown" ? "Pending..." : "Rejected"}</p>
                    </div>

                    <h2 className="md:text-xl text-lg font-medium title-text">Title : {data?.property_title}</h2>

                    <p className="md:text-sm text-xs py-2">
                        <LocationOn></LocationOn>
                        {data?.property_location}
                    </p>
                    <p className="md:text-sm text-xs font-semibold">
                        Price Range : {data?.price_range} TK
                    </p>
                </div>
            </div>

            <div className="p-6 flex justify-between gap-5 flex-wrap">
                <Button variant="contained" size="small">Update</Button>
                <Button variant="contained" color="error" size="small">Delete</Button>
            </div>
        </div>
    );
};

export default AddedPropertyCard;

AddedPropertyCard.propTypes = {
    data: PropTypes.object
}