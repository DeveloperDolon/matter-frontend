import { Box, CircularProgress } from "@mui/material";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AgentRoute = ({children}) => {
    const {loading, user, userRole} = useAuth();


    if(user && userRole === "agent") {
        return children
    }

    if(loading) {
        return <Box sx={{ display: 'flex', height: "100vh", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    }

    return <Navigate to={"/login"}></Navigate>
};

export default AgentRoute;
AgentRoute.propTypes = {
    children: PropTypes.node
}