import React, {useContext, useState} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";
import {AuthContext} from "../context/authContext";
import {ProtectedRoute} from "./protectedRoute/ProtectedRoute";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    console.log("isAuth", isAuth)
    return (
        <Routes>
            {isAuth
                ?
                <Route element={<ProtectedRoute/>}>
                    <Route
                        path='/about'
                        element={<About/>}
                    />
                    <Route
                        path='/posts'
                        element={<Posts/>}
                    />
                    <Route
                        path='/posts/:id'
                        element={<PostIdPage/>}
                    />
                </Route>
                :
                <Route
                    path='/login'
                    element={<Login/>}
                />
            }


            <Route
                path='/'
                element={<Navigate to="/login" replace/>}
            />
            <Route
                path='*'
                element={<Error/>}
            />
        </Routes>
    );
};

export default AppRouter;

// {
//     routes.map(route =>
//         <Route
//             path={route.path}
//             component={route.component}
//         />
//     )
// }

