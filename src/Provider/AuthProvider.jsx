import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const authData = {
        user
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