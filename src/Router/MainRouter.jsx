import {
    createBrowserRouter,
   } from "react-router-dom";
   
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";




const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    }
])

export default MainRouter;