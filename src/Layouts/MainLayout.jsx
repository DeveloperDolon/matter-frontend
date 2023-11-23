import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div>
            hello world from main layout
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;