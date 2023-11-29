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
import AgentDashboard from "../Pages/Agent/AgentDashboard/AgentDashboard";
import AgentProfile from "../Pages/Agent/AgentProfile/AgentProfile";
import AddProperty from "../Pages/Agent/AddProperty/AddProperty";
import AddedProperties from "../Pages/Agent/AddedProperties/AddedProperties";
import UpdateProperty from "../Pages/Agent/UpdateProperty/UpdateProperty";
import AgentSoldProperties from "../Pages/Agent/AgentSoldProperties/AgentSoldProperties";
import RequestedProperties from "../Pages/Agent/RequestedProperties/RequestedProperties";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import AdminManageProperties from "../Pages/Admin/AdminManageProperties/AdminManageProperties";
import AdminManageUser from "../Pages/Admin/AdminManageUser/AdminManageUser";
import ManageReview from "../Pages/Admin/ManageReview/ManageReview";
import PaymentPage from "../Pages/User/UserBoughtProperty/PaymentPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

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
        element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
        children: [
            {
                path: "/admin-dashboard/admin-profile",
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: "/admin-dashboard/admin-manage-properties",
                element: <AdminRoute><AdminManageProperties></AdminManageProperties></AdminRoute>
            },
            {
                path: "/admin-dashboard/admin-manage-users",
                element: <AdminRoute><AdminManageUser></AdminManageUser></AdminRoute>
            },
            {
                path: "/admin-dashboard/admin-manage-review",
                element: <AdminRoute><ManageReview></ManageReview></AdminRoute>
            }
        ]
    },
    {
        path: "/agent-dashboard",
        element: <AgentRoute><AgentDashboard></AgentDashboard></AgentRoute>,
        children: [
            {
                path: "/agent-dashboard/agent-profile",
                element: <AgentRoute><AgentProfile></AgentProfile></AgentRoute>
            },
            {
                path: "/agent-dashboard/agent-add-property",
                element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
            },
            {
                path: "/agent-dashboard/agent-added-properties",
                element: <AgentRoute><AddedProperties></AddedProperties></AgentRoute>
            },
            {
                path: "/agent-dashboard/property-update/:id",
                loader: ({params}) => {
                    const userEmail = localStorage.getItem('userEmail');
                    return fetch(`http://localhost:5000/properties/${params.id}?email=${userEmail}`)
                },
                element: <AgentRoute><UpdateProperty></UpdateProperty></AgentRoute>
            },
            {
                path: "/agent-dashboard/agent-sold-properties",
                element: <AgentRoute><AgentSoldProperties></AgentSoldProperties></AgentRoute>
            },
            {
                path: "/agent-dashboard/agent-requested-properties",
                element: <AgentRoute><RequestedProperties></RequestedProperties></AgentRoute>
            }
        ]
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
            },
            {
                path: "/user-dashboard/payment/:id",
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
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
    },
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>
    }
])

export default MainRouter;