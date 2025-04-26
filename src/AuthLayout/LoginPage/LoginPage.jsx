import { useEffect, useState } from 'react';
import AuthField from '../AuthField/AuthField';
import { NavLink } from 'react-router-dom';
import apiRequest from '../../api/apiRequest';
import { useNavigate } from 'react-router-dom';
import m from './LoginPage.module.css'
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

function LoginPage(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            navigate('/main/mainpage');
        }
    }, [token]);


    const [authFieldsData, setAuthFieldsData] = useState([
        { id: 1, type: 'email', fieldTitle: 'Email', placeholder: 'address@mail.ru', value: '' },
        { id: 2, type: 'password', fieldTitle: 'Пароль', placeholder: 'password', value: '' }
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

    const logIn = async (event) => {
        event.preventDefault();

        const data = {
            email: authFieldsData[0].value,
            password: authFieldsData[1].value,
        };
        dispatch(setUser(null));

        try {
            const response = await apiRequest('/auth/login', 'POST', data);

            if (response.status === 200) {
                const { token, user } = response;

                if (user.is__activated) {
                    localStorage.setItem('token', token);
                    navigate('/main/mainpage');
                } else {
                    alert('Автивируйте аккаунт через ваш email');
                    return;
                }
            } else {
                alert('Неправильный логин или пароль');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка сервера');
        }
    };

    return (
        <div className={m.container}>
            <form className={m.form} onSubmit={logIn}>
                <div className={m.header}>
                    <img src='../../../images/logo.png' className={m.logo}></img >
                    <p className={m.title}>Авторизация</p>
                </div>
                <div className={m.fieldsContainer}>
                    {authFields}
                </div>
                <input type='submit' value='Войти' className={m.signIn} />
                <NavLink to='/auth/signup'><p className={m.toLogin}>Ещё нет аккаунта? Создать...</p></NavLink>
            </form>
        </div>
    );
}

export default LoginPage;