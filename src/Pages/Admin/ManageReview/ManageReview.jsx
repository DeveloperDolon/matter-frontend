
import { Helmet } from "react-helmet";
import useAccessAllReviews from "../../../Hooks/useAccessAllReviews";
import ReviewCardAdmin from "./ReviewCardAdmin";


const ManageReview = () => {

    const { data } = useAccessAllReviews();

    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">
            <Helmet>
                <title>MATTER | Manage Reviews</title>
            </Helmet>
            <div className="flex justify-between gap-8 flex-wrap">
                <h1 className="md:text-5xl text-3xl font-medium title-text">Manage Reviews</h1>
                <h1 className="md:text-5xl text-3xl font-medium title-text">Total : {data?.length}</h1>
            </div>


            {
                data?.length > 0 ?
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:mt-12 mt-8">
                        {
                            data?.map(item => <ReviewCardAdmin key={item._id} data={item}></ReviewCardAdmin>)
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

export default ManageReview;