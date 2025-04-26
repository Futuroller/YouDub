import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import m from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import { fetchSubscribedChannels, clearChannels } from '../../store/slices/channelsSlice';
import { fetchAllPlaylists } from '../../store/slices/playlistsSlice';
import { API_URL_FILES } from '../../config';

function Navbar(props) {
    const isCollapsed = useSelector(state => state.ui.isNavbarCollapsed);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { subscribedChannels, subChannelsStatus } = useSelector(state => state.channels);
    const { watchLaterPlaylist, likedPlaylist } = useSelector(state => state.playlists);

    useEffect(() => {
        dispatch(fetchSubscribedChannels());
        dispatch(fetchAllPlaylists())

        return () => {
            dispatch(clearChannels());
        };
    }, [dispatch]);

    const [topMenu, setTopMenu] = useState([
        { id: 1, title: 'Главная', picture: '../../../images/mainIcon.png', navigation: '/main/mainpage' },
        { id: 2, title: 'Подписки', picture: '../../../images/followChannelsIcon.png', navigation: '/main/subscription-videos' }
    ]);

    const [middleMenu, setMiddleMenu] = useState([
        { id: 3, title: 'История', picture: '../../../images/historyIcon.png', navigation: '/main/history' },
        { id: 4, title: 'Ваш канал', picture: '../../../images/myChannel.png', navigation: `/main/channel/${user.tagname}` },
        { id: 5, title: 'Смотреть позже', picture: '../../../images/watchLaterIcon.png ', navigation: `/main/` },
        { id: 6, title: 'Понравившиеся', picture: '../../../images/likedVideoIcon.png', navigation: `/main/` },
        { id: 7, title: 'Плейлисты', picture: '../../../images/playlistsIcon.png', navigation: '/main/playlists' }
    ]);

    useEffect(() => {
        setMiddleMenu(prevMenu =>
            prevMenu.map(item => {
                if (item.id === 5 && watchLaterPlaylist) {
                    return { ...item, navigation: `/main/playlists/${watchLaterPlaylist.url}` }
                }
                if (item.id === 6 && likedPlaylist) {
                    return { ...item, navigation: `/main/playlists/${likedPlaylist.url}` }
                }
                if (item.id === 4 && user) {
                    return { ...item, navigation: `/main/channel/${user.tagname}` }
                }
                return item;
            })
        );
    }, [watchLaterPlaylist, likedPlaylist]);

    if (subChannelsStatus.error) return <h1>Ошибка: {subChannelsStatus.error}</h1>;

    const topMenuItems = topMenu.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem title={isCollapsed ? '' : i.title} picture={i.picture} /></NavLink>
    ));

    const middleMenuItems = middleMenu.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem title={isCollapsed ? '' : i.title} picture={i.picture} /></NavLink>
    ));

    const subscribedChannelsObjects = subscribedChannels.map(channel => ({
        ...channel,
        navigation: `/main/channel/${channel.tagname}`
    }));

    const followChannelsItems = subscribedChannelsObjects.map(i => (
        <NavLink key={i.id} to={i.navigation} state={{ userId: i.id }}> <MenuItem title={isCollapsed ? '' : i.username} picture={i.avatar_url ? `${API_URL_FILES}/avatars/${i.avatar_url}` : '/images/userDefault.png'} /></NavLink>
    ));

    return (
        <div className={`${m.nav} ${isCollapsed ? m.collapsed : ''}`}>
            <ol>
                {topMenuItems}
            </ol>
            <div className={m.line}></div>
            <ol>
                {middleMenuItems}
            </ol>
            <div className={m.line}></div>
            <ol>
                {followChannelsItems}
            </ol>
        </div>
    );
}

export default Navbar;
