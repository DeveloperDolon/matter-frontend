import { createContext } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const authData = {

    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}