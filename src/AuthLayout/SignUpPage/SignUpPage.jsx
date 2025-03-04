import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthField from '../AuthField/AuthField';
import m from './SignUpPage.module.css'

function SignUpPage(props) {

    const [authFieldsData, setAuthFieldsData] = useState([
        { id: 1, type: 'text', fieldTitle: 'Имя пользователя', placeholder: 'dubinsky' },
        { id: 2, type: 'email', fieldTitle: 'Email', placeholder: 'address@mail.ru' },
        { id: 3, type: 'password', fieldTitle: 'Пароль', placeholder: 'password' },
        { id: 4, type: 'password', fieldTitle: 'Повтор пароля', placeholder: 'password' },
    ])

    let authFields = authFieldsData.map(a => (
        <AuthField key={a.id} fieldTitle={a.fieldTitle} title={a.title} placeholder={a.placeholder} />
    ));

    return (
        <div className={m.container}>
            <div className={m.form}>
                <div className={m.header}>
                    <img src='../../../images/logo.png' className={m.logo}></img >
                    <p className={m.title}>Регистрация</p>
                </div>
                <div className={m.fieldsContainer}>
                    {authFields}
                </div>
                <button className={m.signIn}>Создать аккаунт</button>
                <NavLink to='/auth/login'><p className={m.toLogin}>Уже есть аккаунт? Войти...</p></NavLink>
            </div>
        </div>
    );
}

export default SignUpPage;