import { useDispatch } from 'react-redux';
import Search from '../Search/Search';
import Channel from './Channel/Channel';
import m from './Header.module.css'
import { toggleNavbar } from '../../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onHideClick = () => {
        dispatch(toggleNavbar());
    };

    const onLogoClick = () => {
        navigate('/main/mainpage');
    };

    return (
        <div className={m.header}>
            <img src='../../../images/hideButton.png' className={m.btn} onClick={onHideClick}></img>
            <div className={m.logoBlock} onClick={onLogoClick}>
                <p className={m.title}>YouDub</p>
                <img src='../../../images/logo.png' className={m.logo}></img>
            </div>
            <Search />
            <Channel />
        </div>
    );
}

export default Header;
