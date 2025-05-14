import { useDispatch } from 'react-redux';
import m from './AdminRemoveVideoButton.module.css'
import apiRequest from '../../../../api/apiRequest';
import { clearVideoByUrl } from '../../../../store/slices/videosSlice';

function AdminRemoveVideoButton({ videoName, videoUrl }) {
    const dispatch = useDispatch();

    const onDeleteVideo = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        const answer = confirm('Вы уверены что хотите безвозвратно удалить данное видео?');
        if (!answer) return;
        const promptVideoName = prompt('Для подтверждения удаления видео, введите название данного видео');
        if (!promptVideoName) return;
        if (promptVideoName !== videoName) {
            alert('Неверное название видео');
            return;
        }

        try {
            const response = await apiRequest(`/main/videos/${videoUrl}`, 'DELETE');

            if (response.status === 200) {
                alert(`Видео ${videoName} удалено`);
                dispatch(clearVideoByUrl(videoUrl));
            } else {
                alert('Ошибка удаления видео');
            }
        } catch (error) {
            alert(`Ошибка отправки запроса`);
            console.error(error);
        }
    };

    return (
        <div className={m.container} onClick={onDeleteVideo}>
            <img src={'../../../../../images/crossBold.png'} title='Удалить видео'></img>
        </div>
    );
}

export default AdminRemoveVideoButton;