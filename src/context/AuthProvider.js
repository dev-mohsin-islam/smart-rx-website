import React, { Children, createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.init';
export const AuthContext = createContext();

const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const registration = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // logout
    const logOut = () => {
        signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }

    }, []);
    const loginWithEmailPass = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }

    console.log(user)
    const AuthInfo = {
        registration,
        logOut,
        user,
        loginWithEmailPass
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;