import { useSelector } from 'react-redux';
import { useState } from 'react';
import m from './AddPlaylist.module.css';
import apiRequest from '../../../../api/apiRequest';
import PreloadPlaylist from './PreloadPlaylist/PreloadPlaylist';

function AddPlaylist(props) {
    const user = useSelector((state) => state.user);
    const [playlistName, setPlaylistName] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistAccess, setPlaylistAccess] = useState(1);

    const onCancelClick = () => {
        setPlaylistName('');
        setPlaylistDescription('');
    };

    const onSaveClick = async () => {
        if (!playlistName || !playlistAccess) {
            alert('Пожалуйста, заполните обязательные поля: название и доступ');
            return;
        }

        const body = {
            name: playlistName,
            description: playlistDescription || null,
            id_access: playlistAccess,
        };
        console.log(body)

        try {
            const answer = confirm('Вы уверены, что хотите создать плейлист?');
            if (!answer) return;

            const response = await apiRequest('/main/playlist', 'POST', body);
            console.log(response)

            if (response.status === 200) {
                alert('Плейлист создан');
            } else if (response.status === 206) {
                alert(response.message);
            } else {
                alert(`Ошибка создания плейлиста`);
                console.error(`${response.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Ошибка при создании плейлиста:', error);
            alert('Произошла ошибка при создании плейлиста');
        }
    };

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
                        <input type="radio" name="answer" onChange={() => setPlaylistAccess(1)} />
                        Открытый
                    </label><br></br>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setPlaylistAccess(2)} />
                        Закрытый (доступно только вам)
                    </label>
                </fieldset>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} onClick={onCancelClick}>Отменить</button>
                    <button className={m.headerButton} onClick={onSaveClick}>Создать</button>
                </div>
            </div>
        </div>
    );
}

export default AddPlaylist;