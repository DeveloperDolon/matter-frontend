import {
    createBrowserRouter,
   } from "react-router-dom";
   
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import AgentRoute from "./AgentRoute";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../Pages/User/UserDashboard/UserDashboard";
import UserProfile from "../Pages/User/UserProfile/UserProfile";
import UserWishlist from "../Pages/User/UserWishlist/UserWishlist";
import AllProperties from "../Pages/AllPropertiesPage/AllProperties";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import UserOffer from "../Pages/User/UserOffer/UserOffer";
import UserBoughtProperty from "../Pages/User/UserBoughtProperty/UserBoughtProperty";
import UserReviews from "../Pages/User/UserReviews/UserReviews";

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
                path: "/properties",
                element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
            },
            {
                path: "/properties/:id",
                loader: ({params}) => {
                    const userEmail = localStorage.getItem('userEmail');
                    return fetch(`http://localhost:5000/properties/${params.id}?email=${userEmail}`)
                },
                element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
            },
        ]
    },
    {
        path: "/admin-dashboard",
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>
    },
    {
        path: "/agent-dashboard",
        element: <AgentRoute><h1>Hello world!</h1></AgentRoute>
    },
    {
        path: "/user-dashboard",
        element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
        children: [
            {
                path: "/user-dashboard/user-profile",
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: "/user-dashboard/user-wishlist",
                element: <PrivateRoute><UserWishlist></UserWishlist></PrivateRoute>
            },
            {
                path: "/user-dashboard/user-offer/:id",
                element: <PrivateRoute><UserOffer></UserOffer></PrivateRoute>
            },
            {
                path: "/user-dashboard/user-bought-property",
                element: <PrivateRoute><UserBoughtProperty></UserBoughtProperty></PrivateRoute>
            },
            {
                path: "/user-dashboard/user-reviews",
                element: <PrivateRoute><UserReviews></UserReviews></PrivateRoute>
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