import React from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";

const Error = () => {
    const navigate = useNavigate()
    const goBack = () => navigate(-1) // вернуться назад на одну страницу
    // навигацию, как goHome, лучше не использовать, если нужно сделать переход по ссылке, лучше это делать через Link
    const goHome = () => navigate("/", {replace: true}) // replace - переадресация на конкретную страницу

    return (
        <div style={{color: 'red'}}>
            <h1>
                Вы перешли на несуществующую страницу!
            </h1>
            <MyButton onClick={goBack}>Назад</MyButton>
            <MyButton onClick={goHome}>На главную</MyButton>
        </div>
    );
};

export default Error;