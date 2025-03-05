import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthField from '../AuthField/AuthField';
import apiRequest from '../../api/apiRequest';
import m from './SignUpPage.module.css'

function SignUpPage(props) {

    const [authFieldsData, setAuthFieldsData] = useState([
        { id: 1, type: 'text', fieldTitle: 'Имя пользователя', placeholder: 'dubinsky', value: '' },
        { id: 2, type: 'email', fieldTitle: 'Email', placeholder: 'address@mail.ru', value: '' },
        { id: 3, type: 'password', fieldTitle: 'Пароль', placeholder: 'password', value: '' },
        { id: 4, type: 'password', fieldTitle: 'Повтор пароля', placeholder: 'password', value: '' },
    ]);

    const textChange = (id, value) => {
        setAuthFieldsData(authFieldsData.map(field =>
            field.id === id ? { ...field, value: value } : field
        ));
    }

    let authFields = authFieldsData.map(a => (
        <AuthField key={a.id} fieldTitle={a.fieldTitle} title={a.title} value={a.value} type={a.type}
            placeholder={a.placeholder} onChange={(value) => textChange(a.id, value)} required />
    ));

    const signUp = async (event) => {
        event.preventDefault();

        const data = {
            username: authFieldsData[0].value,
            email: authFieldsData[1].value,
            password: authFieldsData[2].value,
        };

        const passwordRepeat = authFieldsData[3].value;


        if (data.username.length >= 3) {
            if (data.password.length >= 8) {
                if (data.password === passwordRepeat) {

                    try {
                        const response = await apiRequest('/auth/signup', 'POST', data);

                        if (response.success) {
                            alert('Аккаунт создан');
                        } else {
                            alert('Ошибка при создании аккаунта');
                        }

                    } catch (error) {
                        console.error('Ошибка:', error);
                        alert('Ошибка сервера');
                    }

                } else {
                    alert("Пароли не совпадают");
                    return;
                }
            } else {
                alert("Длина пароля должна быть не менее 8-ми символов");
                return;
            }
        } else {
            alert("Длина логина должна быть не менее 3-х символов");
            return;
        }
    };

    return (
        <div className={m.container}>
            <form className={m.form} onSubmit={signUp}>
                <div className={m.header}>
                    <img src='../../../images/logo.png' className={m.logo}></img >
                    <p className={m.title}>Регистрация</p>
                </div>
                <div className={m.fieldsContainer}>
                    {authFields}
                </div>
                <input type='submit' value='Создать аккаунт' className={m.signIn} />
                <NavLink to='/auth/login'><p className={m.toLogin}>Уже есть аккаунт? Войти...</p></NavLink>
            </form>
        </div>
    );
}

export default SignUpPage;