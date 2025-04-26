import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { API_URL_FILES } from '../../../../config';
import m from './EditChannel.module.css';
import { setUser } from '../../../../store/slices/userSlice';
import apiRequest from '../../../../api/apiRequest';

function EditChannel(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [channelName, setChannelName] = useState(user.username);
    const [channelDescription, setChannelDescription] = useState(user.description);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../../images/userDefault.png');
    const [avatar, setAvatar] = useState(`${API_URL_FILES}/avatars/${user.avatar_url}`);
    const [headerPreview, setHeaderPreview] = useState(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
    const [header, setHeader] = useState(`${API_URL_FILES}/headers/${user.channel_header_url}`);

    useEffect(() => {
        if (user) {
            setChannelName(user.username);
            setChannelDescription(user.description);
            setAvatarPreview(user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../../images/userDefault.png');
            setAvatar(null);
            setHeaderPreview(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
            setHeader(null);
        }
    }, [user])

    const onNameChange = (e) => {
        const text = e.target.value;
        setChannelName(text);
    };

    const onDescriptionChange = (e) => {
        const text = e.target.value;
        setChannelDescription(text);
    };

    const onCancelClick = () => {
        setChannelName(user.username);
        setChannelDescription(user.description);
        setAvatarPreview(user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../../images/userDefault.png');
        setHeaderPreview(user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '../../../../images/channelHeader.jpg');
        setAvatar(null);
        setHeader(null);
    };

    const onImageChange = (e, subject) => {
        const file = e.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            if (subject == 'avatar') {
                setAvatar(file);
                setAvatarPreview(URL.createObjectURL(file));
            } else if (subject == 'header') {
                setHeader(file);
                setHeaderPreview(URL.createObjectURL(file));
            }
        } else {
            alert('Можно загружать только файлы PNG, JPEG, JPG');
        }
    };

    const onSaveClick = async () => {
        const updatedFields = {};

        if (user.username !== channelName) updatedFields.username = channelName;
        if (user.description !== channelDescription) updatedFields.description = channelDescription;

        const formData = new FormData();
        if (avatar) formData.append('avatar', avatar);
        if (header) formData.append('header', header);
        Object.keys(updatedFields).forEach(key => formData.append(key, updatedFields[key]));

        if (formData.entries().next().done) {
            alert('Вы не внесли изменений');
            return;
        }

        try {
            const answer = confirm('Вы уверены что хотите сохранить изменения?');
            if (!answer) return;
            const response = await apiRequest(`/main/user/configure`, 'PATCH', formData, true);

            if (response.status === 200) {
                dispatch(setUser(response));
                console.log(response)
                alert('Данные обновлены');
            } else {
                console.log(`Ошибка: ${response.message}`);
            }
        } catch (error) {
            console.error(`Ошибка при обновлении профиля: ${error}`);
        }
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
            <div className={m.avatarContainer}>
                <div className={m.avatarSubContainer}>
                    <input type='file' accept='.png,.jpeg,.jpg' hidden onChange={(e) => onImageChange(e, 'avatar')} className={m.fileSelect}></input>
                    <img src={avatarPreview} className={m.avatar}></img>
                    <img src={'../../images/edit.png'} className={m.edit}></img>
                </div>
                <div className={m.trashboxContainer} onClick={() => onDeleteImage('avatar')}>
                    <img src={'../../images/basket.png'} className={m.trashbox}></img>
                </div>
            </div>
            <div className={m.otherInfoContainer}>
                <div>
                    <p className={m.title}>Название канала</p>
                    <input type='text' className={m.name} value={channelName} onChange={onNameChange}></input>
                </div>
                <div>
                    <p className={m.title}>Описание канала</p>
                    <textarea className={m.description} value={channelDescription} onChange={onDescriptionChange}></textarea>
                </div>
                <div>
                    <p className={m.title}>Шапка канала</p>

                    <div className={m.headerContainer}>
                        <div className={m.headerSubContainer}>
                            <input type='file' accept='.png,.jpeg,.jpg' hidden onChange={(e) => onImageChange(e, 'header')} className={m.fileSelect}></input>
                            <img src={headerPreview} className={m.header}></img>
                            <img src={'../../images/edit.png'} className={m.edit}></img>
                        </div>
                        <div className={m.trashboxContainer} style={{ marginLeft: '20px' }} onClick={() => onDeleteImage('header')}>
                            <img src={'../../images/basket.png'} className={m.trashbox}></img>
                        </div>
                    </div>
                    <p>Рекомендуемый размер - 1500x400px</p>
                </div>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} style={{ marginBottom: '30px' }} onClick={onCancelClick}>Отменить</button>
                    <button className={m.headerButton} style={{ marginBottom: '30px' }} onClick={onSaveClick}>Сохранить</button>
                </div>
            </div>
        </div >
    );
}

export default EditChannel;