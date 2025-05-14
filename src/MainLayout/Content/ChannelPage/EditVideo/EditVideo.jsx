import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import apiRequest from '../../../../api/apiRequest';
import ComboBox from '../ComboBox/ComboBox';
import PreloadVideo from '../PreloadVideo/PreloadVideo';
import m from './EditVideo.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCurrentVideo, fetchVideoByUrl } from '../../../../store/slices/videosSlice';
import { API_URL_FILES } from '../../../../config';

function EditVideo(props) {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const { currentVideo, isLoading, error } = useSelector(state => state.videos);

    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [preview, setPreview] = useState('');
    const [showPreview, setShowPreview] = useState('');
    const [videoCategory, setVideoCategory] = useState('');
    const [videoAccess, setVideoAccess] = useState('');

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(fetchVideoByUrl(lastSegment));

        return () => {
            dispatch(clearCurrentVideo());
        };
    }, [lastSegment, dispatch]);

    useEffect(() => {
        if (currentVideo.id_owner && user.id &&
            currentVideo.id_owner !== user.id) {
            alert('Ошибка доступа');
            navigate(-1);
            return;
        }

        if (currentVideo.name) {
            setVideoName(currentVideo.name);
            setVideoDescription(currentVideo.description);
            setPreview(currentVideo.preview_url);
            setVideoCategory({ id: currentVideo.id_category });
            setShowPreview(currentVideo.preview_url ? `${API_URL_FILES}previews/${currentVideo.preview_url}` : '../../../../images/preview.jpg');
            setVideoAccess(currentVideo.id_access)
        }
    }, [currentVideo])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await apiRequest('/main/categories', 'GET');
                setCategories(categoriesData.categories);
            } catch (error) {
                console.log(error);
                alert('Ошибка загрузки категорий');
            }
        }

        fetchData();
    }, [])

    const onPreviewChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            setPreview(file);
            setShowPreview(URL.createObjectURL(file));
        } else {
            alert('Можно загружать только файлы PNG, JPEG, JPG');
        }
    };

    const onSaveClick = async () => {
        if (!videoName || !videoAccess || !videoCategory) {
            alert('Пожалуйста, заполните обязательные поля: название, доступ и категорию');
            return;
        }

        const formData = new FormData();
        if (currentVideo.name !== videoName) {
            formData.append('name', videoName);
        }

        if (currentVideo.description !== videoDescription) {
            formData.append('description', videoDescription);
        }

        if (currentVideo.id_access !== videoAccess) {
            formData.append('id_access', videoAccess);
        }

        if (currentVideo.id_category !== videoCategory.id) {
            formData.append('id_category', videoCategory.id);
        }

        if (preview && preview instanceof File) {
            formData.append('preview', preview);
        }

        const isEmpty = ![...formData.entries()].length;

        if (isEmpty) {
            alert('Вы не внесли изменений');
            return;
        }

        try {
            const answer = confirm('Вы уверены, что хотите внести изменения?');
            if (!answer) return;

            const response = await apiRequest(`/main/videos/edit/${currentVideo.url}`, 'PATCH', formData, true);

            if (response.status === 200) {
                alert('Изменения внесены');
            } else {
                alert(`Ошибка внесения изменений`);
                console.error(`${response.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Ошибка при отправке изменений:', error);
            alert('Произошла ошибка при внесении изменений');
        }
    };

    if (!currentVideo.users) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (error) return <h1>Ошибка: {error}</h1>;

    return (
        <div className={m.container}>
            <div className={m.videoContainer}>
                <PreloadVideo title={videoName} channelName={user.username}
                    preview={showPreview || '../../../images/preview.jpg'} channelImage={user.avatar_url}
                    views='0' loadDate={new Date()} description={videoDescription} />
            </div>
            <div className={m.otherInfoContainer}>
                <div className={m.textField}>
                    <p className={m.title}>Название</p>
                    <input type='text' className={m.name} value={videoName} onChange={(e) => setVideoName(e.target.value)}></input>
                </div>
                <div className={m.textField}>
                    <p className={m.title}>Описание</p>
                    <textarea className={m.description} value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)}></textarea>
                </div>
                <div className={m.textField}>
                    <p className={m.title}>Превью</p>
                    <div className={m.headerContainer}>
                        <div className={m.headerSubContainer}>
                            <input type='file' accept='.png,.jpeg,.jpg' hidden onChange={(e) => onPreviewChange(e)} className={m.fileSelect}></input>
                            <img src={showPreview || '../../../images/preview.jpg'} className={m.header}></img>
                            <img src={'../../images/edit.png'} className={m.edit}></img>
                        </div>
                    </div>
                    <p>Выберите картинку, которая будет привлекать зрителей</p>
                </div>
                <ComboBox title='Категория' onChange={setVideoCategory} options={categories} selectedValue={videoCategory.id}></ComboBox>

                <fieldset>
                    <legend className={m.title}>Доступ к видео</legend>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setVideoAccess(1)} checked={videoAccess === 1} />
                        Открытый
                    </label><br></br>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setVideoAccess(2)} checked={videoAccess === 2} />
                        Закрытый (доступно только вам)
                    </label>
                </fieldset>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} onClick={() => navigate(-1)}>Назад</button>
                    <button className={m.headerButton} onClick={onSaveClick}>Сохранить изменения</button>
                </div>
            </div>
        </div >
    );
}

export default EditVideo;