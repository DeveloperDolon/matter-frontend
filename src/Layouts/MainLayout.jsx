import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Components/NabBar/NavBar";
import Footer from "../Components/Footer/Footer";

// https://player.vimeo.com/video/766143045?autoplay=1&loop=1&background=1&hd=1&controls=0
const MainLayout = () => {
    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            
            <Outlet></Outlet>

            <Footer></Footer>
        </div>
    );
};

export default MainLayout;