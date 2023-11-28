import { Helmet } from "react-helmet";
import useAccessAgentProperties from "../../../Hooks/useAccessAgentProperties";
import AddedPropertyCard from "./AddedPropertyCard";


const AddedProperties = () => {

    const { data: allAddedProperties } = useAccessAgentProperties();

    return (
        <div className="w-full md:px-10 px-5 md:py-10 py-5">
            <Helmet>
                <title>MATTER | Added Property</title>
            </Helmet>

            <h1 className="md:text-5xl text-3xl font-semibold title-text">My all added properties</h1>

            {
                allAddedProperties?.length > 0 ? 
                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 md:mt-16 mt-10">
                    {
                         allAddedProperties?.map(item => <AddedPropertyCard key={item._id} data={item}></AddedPropertyCard>) 
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

export default AddedProperties;