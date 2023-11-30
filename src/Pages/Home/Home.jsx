import { Helmet } from "react-helmet";
import AdvertisementProperty from "../../Components/AdvertiseProperty/AdvertisementProperty";
import LatestUsersReviews from "../../Components/LatestUsersReviews/LatestUsersReviews";
import Banner from "../../Components/Banner/Banner";
import AnimationPage from "../../Components/AnimativeText/AnimationPage";


const HomePage = () => {


    return (
        <div>
            <Helmet>
                <title>MATTER | Home</title>
            </Helmet>
            <Banner></Banner>

            <AdvertisementProperty></AdvertisementProperty>

            <AnimationPage></AnimationPage>

            <LatestUsersReviews></LatestUsersReviews>
        </div>
    );
};

export default HomePage;