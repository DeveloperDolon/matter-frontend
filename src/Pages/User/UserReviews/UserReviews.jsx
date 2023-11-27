import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ReviewCard from "./ReviewCard";


const UserReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews } = useQuery({
        queryKey: ["user-reviews"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-reviews?email=${user?.email}`);

            return response.data;
        }
    })


    return (
        <div className="w-full md:px-10 px-5 md:py-16 py-5 md:pb-32 pb-24">
            <h1 className="md:text-5xl  text-3xl font-semibold title-text">My Reviews</h1>

            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:mt-12 mt-8">
                {
                    reviews?.length > 0 ? 
                        reviews?.map(item => <ReviewCard key={item._id} data={item}></ReviewCard>)
                    :

                        <div className="flex 2xl:col-span-4 lg:col-span-3 md:col-span-2  justify-center">
                            <img className="md:w-[70%] mx-auto w-full" src="https://theyouthproject.in/static/media/empty_data_set.88c7d759.png" alt="" />
                        </div>

                }
            </div>
        </div>
    );
};

export default UserReviews;