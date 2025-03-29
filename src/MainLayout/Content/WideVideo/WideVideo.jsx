import apiRequest from '../../../api/apiRequest';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { removeHistoryVideo } from '../../../store/slices/videosSlice';
import m from './WideVideo.module.css'

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

    const handleDelete = async (videoId) => {
        try {
            const deletedVideo = await apiRequest(`/main/history/${videoId}`, 'DELETE');
            console.log(deletedVideo);
            dispatch(removeHistoryVideo(videoId));
        } catch (error) {
            console.error("Ошибка при удалении" + error);
        }
    }

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>

            <div className={m.videoInfo}>
                <div className={m.subContainer}>
                    <p className={m.title}>{props.title}</p>
                    <div className={m.nameViews}>
                        <p>{props.channelName}</p>
                        <p>{props.views}</p>
                    </div>
                </div>
                <p className={m.description}>{props.description}</p>
            </div>
            <div className={m.buttons}>
                <button className={m.deleteButton} onClick={() => handleDelete(props.id)}></button>
                <button
                    ref={buttonRef}
                    className={m.moreButton}
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>
            <div className={m.menuContainer} ref={menuRef}>
                {isOpen && <DropdownMenu menuItems={menuItems} top="50px" left="-250px" />}
            </div>
        </div>
    );
}

export default WideVideo;
