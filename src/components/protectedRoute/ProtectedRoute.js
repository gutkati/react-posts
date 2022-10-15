import React, {useContext} from "react";
import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {AuthContext} from "../../context/authContext";


const ProtectedRoute = ({children}) => {
    const {isAuth} = useContext(AuthContext)
    console.log("Auth", isAuth)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    return children ? children : <Outlet />;
}
export {ProtectedRoute}

// export function ProtectedRoute({ isAuth , redirectPath, children }) {
//     if (!isAuth) return <Navigate to={redirectPath} replace />
//     return children ? children : <Outlet />;
//
// };
