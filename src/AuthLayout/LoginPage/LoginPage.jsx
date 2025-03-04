import { useState } from 'react';
import AuthField from '../AuthField/AuthField';
import { NavLink } from 'react-router-dom';
import m from './LoginPage.module.css'

function LoginPage(props) {

    const [authFieldsData, setAuthFieldsData] = useState([
        { id: 1, type: 'email', fieldTitle: 'Email', placeholder: 'address@mail.ru' },
        { id: 2, type: 'password', fieldTitle: 'Пароль', placeholder: 'password' },
    ])

    let authFields = authFieldsData.map(a => (
        <AuthField key={a.id} fieldTitle={a.fieldTitle} title={a.title} placeholder={a.placeholder} />
    ));

    return (
        <div className={m.container}>
            <div className={m.form}>
                <div className={m.header}>
                    <img src='../../../images/logo.png' className={m.logo}></img >
                    <p className={m.title}>Авторизация</p>
                </div>
                <div className={m.fieldsContainer}>
                    {authFields}
                </div>
                <button className={m.signIn}>Войти</button>
                <NavLink to='/auth/signup'><p className={m.toLogin}>Ещё нет аккаунта? Создать...</p></NavLink>
            </div>
        </div>
    );
}

export default LoginPage;