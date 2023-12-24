import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AdvertisePropertyCard from "./AdvertiesPropertyCard";


const AdvertiseProperty = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data = [], refetch } = useQuery({
        queryKey: ["verified-properties"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/properties?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div className="md:pt-10 pt-7 md:px-10 sm:px-5 px-3">
            <h1 className="md:text-5xl text-3xl font-semibold title-text ">Advertise Properties</h1>
            {
                data && data?.length > 0 ?
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 md:mt-16 mt-10">
                        {
                            data?.map(item => <AdvertisePropertyCard key={item._id} data={item} reload={refetch}></AdvertisePropertyCard>)
                        }
                    </div>
                    :
                    <div className="flex justify-center">
                        <img className="md:w-[70%] mx-auto w-full" src="https://theyouthproject.in/static/media/empty_data_set.88c7d759.png" alt="" />
                    </div>
            }
        </div>
    );
};

export default AdvertiseProperty;