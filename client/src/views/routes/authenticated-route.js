import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../../context/appContext"

const AuthenticatedRoute = () => {
    const { user } = useAppContext()
    if ( user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default AuthenticatedRoute;
