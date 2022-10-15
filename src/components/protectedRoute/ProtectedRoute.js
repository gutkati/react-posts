import React, {useContext} from "react";
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {AuthContext} from "../../context/authContext";

const ProtectedRoute = ({children}) => {
    const {isAuth} = useContext(AuthContext)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    return children ? children : <Outlet />;
}
export {ProtectedRoute}
