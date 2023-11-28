import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { axiosPublic } from "../Hooks/useAxiosPublic";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);

        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser)
                setUser(currentUser);
                localStorage.setItem("userEmail", currentUser?.email);

                axiosPublic.post("/jwt", { user: currentUser?.email })
                    .then(res => {
                        console.log(res.data)
                        axiosPublic.get(`/user?email=${currentUser?.email}`)
                            .then(res => {
                                if (res.data.role === "admin") {
                                    setUserRole("admin");
                                    setLoading(false);
                                } else if (res.data.role === "agent") {
                                    setUserRole("agent");
                                    setLoading(false);
                                } else if (res.data.role === "user") {
                                    setUserRole("user");
                                    setLoading(false);
                                }else if (res.data.role === "fraud") {
                                    setUserRole("fraud");
                                    setLoading(false);
                                }
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))

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
        loading,
        emailSignIn,
        googleLogin,
        logOut,
        setUser,
        userRole
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