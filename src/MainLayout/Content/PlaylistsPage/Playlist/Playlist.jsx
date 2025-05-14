import { NavLink, useNavigate } from 'react-router-dom';
import m from './Playlist.module.css'
import { useState } from 'react';
import AdminRemovePlaylistButton from './AdminRemovePlaylistButton/AdminRemovePlaylistButton';

function Playlist(props) {
    const navigate = useNavigate();
    const [isCaptionExist, setIsCaptionExist] = useState(false);

    let displayedStatus = 'Публичный доступ';
    if (props.access_status === 'default playlist' || props.access_status === 'private') {
        displayedStatus = 'Закрытый доступ';
    }

    const onPlaylistEdit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/main/edit-playlist/${props.url}`);
    };

    const onShareClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(window.location.href + `/${props.url}`);
            setIsCaptionExist(true);
            setTimeout(() => {
                setIsCaptionExist(false);
            }, 1500);
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    return (
        <NavLink to={`/main/playlists/${props.url}`} className={m.container}>
            <div className={m.previewContainer}>
                <img src={props.preview} className={m.preview}></img>
                {props.canEdit ?
                    <img src='../../../../images/edit.png' className={m.editButton} onClick={onPlaylistEdit} /> :
                    ''}
                <img src='../../../../images/share.png' className={m.shareButton} onClick={onShareClick} />
                {props.title === 'Смотреть позже' || props.title === 'Понравившиеся' ?
                    '' :
                    <AdminRemovePlaylistButton playlistName={props.title} playlistUrl={props.url} />}
            </div>
            <div className={m.underPreview}>
                <div className={m.videoDescription}>
                    <div className={m.topBlock}>
                        <p className={m.title}>{props.title}</p>
                        <p>{props.videosCount} видео</p>
                    </div>
                    <div className={m.access}>
                        <p>{displayedStatus}</p>
                    </div>
                </div>
            </div>
            {isCaptionExist ?
                <div className={m.caption}>
                    <p>Ссылка скопирована в буфер обмена</p>
                </div> : ''}
        </NavLink>
    );
}

export default Playlist;
