import {
    createBrowserRouter,
   } from "react-router-dom";
   
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";




const MainRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/admin-dashboard",
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    }
])

export default MainRouter;