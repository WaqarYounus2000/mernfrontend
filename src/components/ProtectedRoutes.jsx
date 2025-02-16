import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { GetDataByAxios } from "../axios/axiosConfig";
import CircularProgress from '@mui/material/CircularProgress';
import IsEmailVefified from "./IsEmailVefified";

const ProtectedRoute = () => {
    const [CurrentUser, setCurrentUser] = useState(); // null = loading state
    const [isLogedIn, setIsLogedIn] = useState(null); // null = loading state
    const [isEmailVerified, setisEmailVerified] = useState(false); // null = loading state

    useEffect(() => {
        const checkAuth = async () => {
            try {

                const response = await GetDataByAxios(`${process.env.REACT_APP_BACKEND_API}/auth/jwt`, { withCredentials: true })
                const { isAuthenticated, isEmailVerified, current_user } = response?.data
                setCurrentUser(current_user?.email)
                setIsLogedIn(isAuthenticated);
                setisEmailVerified(isEmailVerified);
                // console.log("isAuthenticated:" + isAuthenticated + "--isEmailVerified:" + isEmailVerified)

            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsLogedIn(false);
            }
        };

        checkAuth();

    }, []);






    if (isLogedIn === null) {
        return <p><CircularProgress size={30} color="inherit" /></p>; // Show while checking auth
    }

    // return isLogedIn && isEmailVerified ? <Outlet /> : <Navigate to="/" replace />;
    return isLogedIn ? (isEmailVerified ? <Outlet /> : <IsEmailVefified CurrentUser={CurrentUser} />) : <Navigate to="/" replace />;










};








export default ProtectedRoute;
