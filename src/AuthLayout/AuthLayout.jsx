import SignUpPage from './SignUpPage/SignUpPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import m from './AuthLayout.module.css'

function AuthLayout(props) {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path='/login/*' element={<LoginPage />} />
            <Route path='/signup/*' element={<SignUpPage />} />
        </Routes>
    );
}

export default AuthLayout;