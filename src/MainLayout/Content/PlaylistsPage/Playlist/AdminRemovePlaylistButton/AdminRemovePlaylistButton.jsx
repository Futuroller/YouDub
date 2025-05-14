import { useDispatch } from 'react-redux';
import m from './AdminRemovePlaylistButton.module.css'
import apiRequest from '../../../../../api/apiRequest';
import { clearPlaylistByUrl } from '../../../../../store/slices/playlistsSlice';

function AdminRemovePlaylistButton({ playlistName, playlistUrl }) {
    const dispatch = useDispatch();

    const onDeletePlaylist = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const answer = confirm('Вы уверены что хотите безвозвратно удалить данный плейлист?');
        if (!answer) return;

        try {
            const response = await apiRequest(`/main/playlist/${playlistUrl}`, 'DELETE');

            if (response.status === 200) {
                alert(`Плейлист ${playlistName} удалён`);
                dispatch(clearPlaylistByUrl(playlistUrl));
            } else {
                alert('Ошибка удаления плейлиста');
            }
        } catch (error) {
            alert(`Ошибка отправки запроса`);
            console.error(error);
        }
    };

    return (
        <div className={m.container} onClick={onDeletePlaylist}>
            <img src={'../../../../../images/crossBold.png'} title='Удалить плейлист'></img>
        </div>
    );
}

export default AdminRemovePlaylistButton;