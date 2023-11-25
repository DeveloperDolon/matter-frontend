import { Box, CircularProgress } from "@mui/material";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {loading, user, userRole} = useAuth();

    if(user && userRole === "admin") {
        return children
    }

    if(loading) {
        return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }

    return <Navigate to={"/login"}></Navigate>
};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
}