import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import m from './Channel.module.css'
import { useNavigate } from 'react-router-dom';
import { API_URL_FILES } from '../../../config';

function Channel() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const goMyChannelHandler = () => {
        navigate('/main/my-channel');
    };

    const goSettingsHandler = () => {
        navigate('/main/my-channel/configure-channel');
    };

    const leaveAccHandler = () => {
        const answer = confirm('Вы уверены что хотите выйти из аккаунта?');
        if (answer) {
            navigate('/auth/login');
            localStorage.removeItem('token');
        }
    };

    const [menuItems, setMenuItems] = useState([
        { id: 1, text: 'Перейти на канал', picture: '../../../images/mainIcon.png', onClickHandler: goMyChannelHandler },
        { id: 2, text: 'Настройки', picture: '../../../images/settings.png', onClickHandler: goSettingsHandler },
        { id: 3, text: 'Выйти из аккаунта', picture: '../../../images/exit.png', onClickHandler: leaveAccHandler }
    ]);

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className={m.container} ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
                <img src={user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
                <p className={m.channelTitle}>{user.username}</p>
            </div>
            <div className={m.menuContainer} ref={menuRef}>
                {isOpen && <DropdownMenu menuItems={menuItems} />}
            </div>
        </div>
    );
}

export default Channel;