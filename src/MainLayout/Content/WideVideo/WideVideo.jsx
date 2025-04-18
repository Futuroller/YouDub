import apiRequest from '../../../api/apiRequest';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { clearHistoryVideos, fetchHistory, removeHistoryVideo } from '../../../store/slices/videosSlice';
import m from './WideVideo.module.css'
import { NavLink } from 'react-router-dom';
import getMeasurementUnit from '../../../utils/getMeasurementUnit';
import setWordEnding from '../../../utils/setWordEnding';

function WideVideo(props) {

    const [menuItems, setMenuItems] = useState([
        { id: 1, text: 'Смотреть позже', picture: '../images/mainIcon.png' },
        { id: 2, text: 'Добавить в плейлист', picture: '../images/followChannelsIcon.png' },
        { id: 3, text: 'Поделиться', picture: '../images/followChannelsIcon.png' }
    ]);

    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const onVideoClick = async () => {
        const response = await apiRequest(`/main/history/${props.url}`, 'POST');

        if (response.status !== 200) {
            return;
        } else {
            dispatch(clearHistoryVideos());
            dispatch(fetchHistory({ page, limit: 10 }));
        }
    };

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

    const handleDelete = async (e, videoId) => {
        try {
            e.stopPropagation();
            e.preventDefault();
            const deletedVideo = await apiRequest(`/main/history/${videoId}`, 'DELETE');
            dispatch(removeHistoryVideo(videoId));
        } catch (error) {
            console.error("Ошибка при удалении" + error);
        }
    };

    const handleMore = async (e, videoId) => {
        try {
            () => setIsOpen(!isOpen)
            e.stopPropagation();
            e.preventDefault();
        } catch (error) {
            console.error("Ошибка" + error);
        }
    };

    return (
        <NavLink to={`/main/video/${props.url}`} className={m.container} onClick={onVideoClick}>
            <img src={props.preview} className={m.preview}></img>

            <div className={m.videoInfo}>
                <div className={m.subContainer}>
                    <p className={m.title}>{props.title}</p>
                    <div className={m.nameViews}>
                        <p>{props.channelName}</p>
                        <p>{setWordEnding(getMeasurementUnit(props.views), 'просмотр', '', 'а', 'ов')}</p>
                    </div>
                </div>
                <p className={m.description}>{props.description}</p>
            </div>
            <div className={m.buttons}>
                <button className={m.deleteButton} onClick={(e) => handleDelete(e, props.id)}></button>
                <button
                    ref={buttonRef}
                    className={m.moreButton}
                    onClick={(e) => handleMore(e, props.id)}
                />
            </div>
            <div className={m.menuContainer} ref={menuRef}>
                {isOpen && <DropdownMenu menuItems={menuItems} top="50px" left="-250px" />}
            </div>
        </NavLink>
    );
}

export default WideVideo;
