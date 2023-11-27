import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { LocationOn } from "@mui/icons-material";
import { Button } from "@mui/material";


const UserBoughtProperty = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: boughtProperty } = useQuery({
        queryKey: ["user-bought-property"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-bought-property?email=${user?.email}`);

            return response.data;
        }
    })

    const ab = 0;

    return (
        <div className="w-full md:px-10 px-5 md:py-16 py-5 md:pb-32 pb-24">
            <h1 className="md:text-5xl  text-3xl font-semibold title-text">Property Bought</h1>

            <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 md:mt-16 mt-10">
                {
                    ab > 0 ? 

                    boughtProperty?.map(item => <div className="bg-[#fafafa] overflow-hidden rounded-xl shadow-lg flex flex-col justify-between" key={item._id}>
                        <div>
                            <div>
                                <img className="lg:h-[350px] object-cover md:h-[300px] sm:h-[250px] h-[200px] w-full" src={item.property_image} alt="" />
                            </div>

                            <div className="p-6 pb-0">
                                <h3 className="md:text-lg text-base font-semibold">{item?.property_title}</h3>
                                
                                <p className="py-2"><LocationOn></LocationOn> {item?.property_location}</p>

                                <p className="md:text-sm text-xs italic font-medium">Agent name : {item?.agent_name}</p>

                                <p className="my-2 py-1 font-medium w-fit bg-slate-800 text-white px-3 rounded-full">Offered amount : {item?.offered_price} Tk</p>
                            </div>
                        </div>

                        <div className="px-6 pb-6 pt-3">
                            {
                                item?.status === "accepted" ? 
                                <Button
                                color="info"
                                size="large"
                                variant="contained"

                                >Pay</Button>
                                : <p className={`md:text-sm text-xs font-medium title-text w-fit py-2 px-3 ${item?.status === "rejected" ? "bg-red-500" : "bg-yellow-500"} text-white rounded-full shadow-lg`}>
                                    Status : {item?.status}
                                </p>
                            }
                        </div>
                    </div>)

                    :

                        <div className="flex 2xl:col-span-5 xl:col-span-4 lg:col-span-3 md:col-span-2  justify-center">
                            <img className="md:w-[70%] mx-auto w-full" src="https://theyouthproject.in/static/media/empty_data_set.88c7d759.png" alt="" />
                        </div>
                }
            </div>
        </div>
    );
};

export default UserBoughtProperty;