import { Helmet } from "react-helmet";
import AdvertisementProperty from "../../Components/AdvertiseProperty/AdvertisementProperty";
import LatestUsersReviews from "../../Components/LatestUsersReviews/LatestUsersReviews";
import Banner from "../../Components/Banner/Banner";
import AnimationPage from "../../Components/AnimativeText/AnimationPage";
import Aboutus from "../../Components/Aboutus/Aboutus";
import Clients from "../../Components/Clients/Clients";
import ContactUs from "../../Components/Contact/ContactUs";


const HomePage = () => {


    return (
        <div>
            <Helmet>
                <title>MATTER | Home</title>
            </Helmet>
            <Banner></Banner>

            <AdvertisementProperty></AdvertisementProperty>

            <AnimationPage></AnimationPage>

            <Aboutus></Aboutus>

            <Clients></Clients>

            <ContactUs></ContactUs>

            <LatestUsersReviews></LatestUsersReviews>
        </div>
    );
};

export default HomePage;