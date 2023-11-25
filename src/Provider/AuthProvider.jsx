import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";
import { axiosPublic } from "../Hooks/useAxiosPublic";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                console.log(currentUser)
                setUser(currentUser); 

                axiosPublic.post("/jwt", {user: currentUser?.email})
                .then(res => console.log(res))
                .catch(err => console.log(err))

                setLoading(false);
            }
            else {
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const authData = {
        user,
        createUser,
        loading
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