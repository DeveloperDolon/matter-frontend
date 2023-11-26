import { Helmet } from "react-helmet";
import AdvertisementProperty from "../../Components/AdvertiseProperty/AdvertisementProperty";
import Banner from "../../Components/Banner/Banner";


const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>MATTER | Home</title>
            </Helmet>
            <Banner></Banner>

            <AdvertisementProperty></AdvertisementProperty>
        </div>
    );
};

export default HomePage;