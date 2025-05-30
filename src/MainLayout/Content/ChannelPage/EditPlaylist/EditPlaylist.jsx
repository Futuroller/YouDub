import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import apiRequest from '../../../../api/apiRequest';
import m from './EditPlaylist.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCurrentPlaylist, clearPlaylists, fetchPlaylistByUrl } from '../../../../store/slices/playlistsSlice';
import PreloadPlaylist from '../AddPlaylist/PreloadPlaylist/PreloadPlaylist';

function EditPlaylist(props) {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const { currentPlaylist, status } = useSelector(state => state.playlists);

    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistAccess, setPlaylistAccess] = useState(1);

    useEffect(() => {
        dispatch(fetchPlaylistByUrl(lastSegment));

        return () => {
            dispatch(clearCurrentPlaylist());
        };
    }, [lastSegment, dispatch]);

    useEffect(() => {
        if (currentPlaylist.id_user && user.id &&
            currentPlaylist.id_user !== user.id) {
            alert('Ошибка доступа');
            navigate(-1);
            return;
        }

        if (currentPlaylist.name) {
            if (!currentPlaylist.isDefault) {
                setPlaylistName(currentPlaylist.name);
                setPlaylistDescription(currentPlaylist.description || '');
                setPlaylistAccess(currentPlaylist.id_access)
            } else {
                dispatch(clearCurrentPlaylist());
                dispatch(clearPlaylists());
                alert('Стандартные плейлисты нельзя изменять');
                navigate(-1)
                return;
            }
        }

    }, [currentPlaylist])

    const onSaveClick = async () => {
        if (!playlistName || !playlistAccess) {
            alert('Пожалуйста, заполните обязательные поля: название и доступ');
            return;
        }

        const data = {};
        if (currentPlaylist.name !== playlistName) {
            data.name = playlistName;
        }

        if (currentPlaylist.description !== playlistDescription) {
            data.description = playlistDescription;
        }

        if (currentPlaylist.id_access !== playlistAccess) {
            data.id_access = playlistAccess
        }

        const isEmpty = Object.keys(data).length === 0;

        if (isEmpty) {
            alert('Вы не внесли изменений');
            return;
        }

        try {
            const answer = confirm('Вы уверены, что хотите внести изменения?');
            if (!answer) return;

            const response = await apiRequest(`/main/playlist/edit/${currentPlaylist.url}`, 'PATCH', data);

            if (response.status === 200) {
                alert('Изменения внесены');
                navigate(-1);
            } else {
                alert(`Ошибка внесения изменений`);
                console.error(`${response.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Ошибка при отправке изменений:', error);
            alert('Произошла ошибка при внесении изменений');
        }
    };
    if (!currentPlaylist.name) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (status.error) return <h1>Ошибка: {status.error}</h1>;

    return (
        <div className={m.container}>
            <div className={m.playlistContainer}>
                <PreloadPlaylist
                    title={playlistName}
                    preview={'../../../../images/playlistIcon.png'}
                    access_status={playlistAccess}
                    videosCount={0}
                />
            </div>
            <div className={m.otherInfoContainer}>
                <div className={m.textField}>
                    <p className={m.title}>Название</p>
                    <input type='text' className={m.name} value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} maxLength={60}></input>
                </div>
                <div className={m.textField}>
                    <p className={m.title}>Описание</p>
                    <textarea className={m.description} value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)}></textarea>
                </div>
                <fieldset>
                    <legend className={m.title}>Доступ к плейлисту</legend>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setPlaylistAccess(1)} checked={playlistAccess === 1} />
                        Открытый
                    </label><br></br>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setPlaylistAccess(2)} checked={playlistAccess === 2} />
                        Закрытый (доступно только вам)
                    </label>
                </fieldset>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} onClick={() => navigate(-1)}>Назад</button>
                    <button className={m.headerButton} onClick={onSaveClick}>Сохранить изменения</button>
                </div>
            </div>
        </div>
    );
}

export default EditPlaylist;