import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/authContext";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
        navigate('/login')
    }

    return (
        <div className="navBar">
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navBar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;