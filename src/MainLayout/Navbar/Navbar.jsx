import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../MenuItem/MenuItem';
import m from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import { fetchSubscribedChannels, clearChannels } from '../../store/slices/channelsSlice';
import { fetchAllPlaylists } from '../../store/slices/playlistsSlice';

function Navbar(props) {
    const dispatch = useDispatch();
    const { subscribedChannels, status } = useSelector(state => state.channels);
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
        { id: 4, title: 'Ваш канал', picture: '../../../images/yourVideosIcon.png', navigation: '/main/my-channel' },
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
                return item;
            })
        );
    }, [watchLaterPlaylist, likedPlaylist]);

    if (status.error) return <h1>Ошибка: {status.error}</h1>;

    // const [followChannels, setFollowChannels] = useState([
    //     { id: 8, title: 'Канал №1', picture: '../images/nehochu.jpg' },
    //     { id: 9, title: 'Канал №2', picture: '../images/nehochu.jpg' },
    //     { id: 10, title: 'Канал №3', picture: '../images/nehochu.jpg' }
    // ]);

    let topMenuItems = topMenu.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem title={i.title} picture={i.picture} /></NavLink>
    ));

    let middleMenuItems = middleMenu.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem title={i.title} picture={i.picture} /></NavLink>
    ));

    let followChannelsItems = subscribedChannels.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem title={i.username} picture={i.avatar_url || '/images/userDefault.png'} /></NavLink>
    ));

    return (
        <div className={m.nav}>
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
