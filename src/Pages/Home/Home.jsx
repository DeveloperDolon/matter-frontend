import { Helmet } from "react-helmet";
import AdvertisementProperty from "../../Components/AdvertiseProperty/AdvertisementProperty";
import Banner from "../../Components/Banner/Banner";
import LatestUsersReviews from "../../Components/LatestUsersReviews/LatestUsersReviews";


const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>MATTER | Home</title>
            </Helmet>
            <Banner></Banner>

            <AdvertisementProperty></AdvertisementProperty>

            <LatestUsersReviews></LatestUsersReviews>
        </div>
    );
};

export default HomePage;