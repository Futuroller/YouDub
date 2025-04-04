import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { API_URL_FILES } from '../../../../config';
import m from './AddVideo.module.css';
import { setUser } from '../../../../store/slices/userSlice';
import apiRequest from '../../../../api/apiRequest';
import ComboBox from './ComboBox/ComboBox';

function AddVideo(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [video, setVideo] = useState();
    const [videoName, setVideoName] = useState();
    const [videoDescription, setVideoDescription] = useState();
    const [videoPreview, setVideoPreview] = useState(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
    const [videoTags, setVideoTags] = useState();

    useEffect(() => {
        if (user) {
            setVideoPreview(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
            setVideo(null);
        }
    }, [user])

    const onNameChange = (e) => {
        const text = e.target.value;
        setVideoName(text);
    };

    const onDescriptionChange = (e) => {
        const text = e.target.value;
        setVideoDescription(text);
    };

    const onTagsChange = (e) => {
        const text = e.target.value;
        setVideoTags(text);
    };

    const onCancelClick = () => {
        setVideoPreview(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
        setAvatar(null);
        setVideo(null);
    };

    const onPreviewChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            setVideoPreview(file);
        } else {
            alert('Можно загружать только файлы PNG, JPEG, JPG');
        }
    };

    const onVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && ['video/mp4', 'video/webm'].includes(file.type)) {
            setVideo(file);
        } else {
            alert('Можно загружать только файлы MP4 и WebM');
        }
    };

    const onSaveClick = async () => {
        // const updatedFields = {};

        // if (user.username !== channelName) updatedFields.username = channelName;
        // if (user.description !== channelDescription) updatedFields.description = channelDescription;

        // const formData = new FormData();
        // if (avatar) formData.append('avatar', avatar);
        // if (header) formData.append('header', header);
        // Object.keys(updatedFields).forEach(key => formData.append(key, updatedFields[key]));

        // if (formData.entries().next().done) {
        //     alert('Вы не внесли изменений');
        //     return;
        // }

        // try {
        //     const answer = confirm('Вы уверены что хотите сохранить изменения?');
        //     if (!answer) return;
        //     const response = await apiRequest(`/main/user/configure`, 'PATCH', formData, true);

        //     if (response.status === 200) {
        //         dispatch(setUser(response));
        //         console.log(response)
        //         alert('Данные обновлены');
        //     } else {
        //         console.log(`Ошибка: ${response.message}`);
        //     }
        // } catch (error) {
        //     console.error(`Ошибка при обновлении профиля: ${error}`);
        // }
    };

    const onDeleteImage = async (subject) => {
        const answer = confirm('Вы уверены что хотите удалить изображение?');
        if (!answer) return;
        const avatar_url = user.avatar_url;
        const channel_header_url = user.channel_header_url;
        const data = subject === 'avatar' ? { avatar_url } : { channel_header_url }
        try {
            const response = await apiRequest(`/main/user/configure`, 'DELETE', data);
            if (response.status == 200) {
                dispatch(setUser(response));
                console.log(response)
                alert('Изображение удалёно');
            } else {
                console.log(`Ошибка: ${response.message}`);
            }

        } catch (error) {
            alert('Ошибка удаления изображения');
            console.log(error);
        }
    };

    return (
        <div className={m.container}>
            <div className={m.videoContainer}>
                <div className={m.videoSubContainer}>
                    <input type='file' accept='.mp4,.webm' hidden onChange={onVideoChange} className={m.fileSelect}></input>
                    <img src={video} className={m.video}></img>
                    <img src={'../../images/edit.png'} className={m.edit}></img>
                </div>
                <button className={m.headerButton} onClick={onCancelClick}>Опубликовать</button>
            </div>
            <div className={m.otherInfoContainer}>
                <div>
                    <p className={m.title}>Название</p>
                    <input type='text' className={m.name} value={videoName} onChange={onNameChange}></input>
                </div>
                <div>
                    <p className={m.title}>Описание</p>
                    <textarea className={m.description} value={videoDescription} onChange={onDescriptionChange}></textarea>
                </div>
                <div>
                    <p className={m.title}>Превью</p>
                    <div className={m.headerContainer}>
                        <div className={m.headerSubContainer}>
                            <input type='file' accept='.png,.jpeg,.jpg' hidden onChange={(e) => onPreviewChange(e, 'header')} className={m.fileSelect}></input>
                            <img src={videoPreview} className={m.header}></img>
                            <img src={'../../images/edit.png'} className={m.edit}></img>
                        </div>
                        <div className={m.trashboxContainer} style={{ marginLeft: '20px' }} onClick={() => onDeleteImage('header')}>
                            <img src={'../../images/basket.png'} className={m.trashbox}></img>
                        </div>
                    </div>
                    <p>Выберите картинку, которая будет привлекать зрителей</p>
                </div>
                <ComboBox title='Добавить в плейлист'></ComboBox>
                <ComboBox title='Категория'></ComboBox>
                <div>
                    <p className={m.title}>Теги</p>
                    <textarea className={m.description} value={videoTags} onChange={onTagsChange}></textarea>
                </div>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} style={{ marginBottom: '30px' }} onClick={onSaveClick}>Сохранить</button>
                </div>
            </div>
        </div >
    );
}

export default AddVideo;