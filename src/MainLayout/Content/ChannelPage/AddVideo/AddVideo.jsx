import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import m from './AddVideo.module.css';
import apiRequest from '../../../../api/apiRequest';
import passPartOfText from '../../../../utils/passPartOfText';
import ComboBox from '../ComboBox/ComboBox';
import ReactPlayer from 'react-player';
import PreloadVideo from '../PreloadVideo/PreloadVideo';

function AddVideo(props) {
    const user = useSelector((state) => state.user);
    const [video, setVideo] = useState();
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [videoName, setVideoName] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [preview, setPreview] = useState();
    const [showPreview, setShowPreview] = useState();
    const [videoPlaylist, setVideoPlaylist] = useState();
    const [videoCategory, setVideoCategory] = useState();
    const [videoTags, setVideoTags] = useState([]);
    const [rawTags, setRawTags] = useState('');
    const [videoAccess, setVideoAccess] = useState();

    const [playlists, setPlaylists] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistsData = await apiRequest('/main/playlists', 'GET');
                const categoriesData = await apiRequest('/main/categories', 'GET');

                setPlaylists(playlistsData.playlists);
                setCategories(categoriesData.categories);
            } catch (error) {
                console.log(error);
                alert('Ошибка загрузки плейлистов');
            }
        }

        fetchData();
    }, [])

    const onTagsChange = (e) => {
        const text = e.target.value;
        setRawTags(text);

        const tagsArray = text
            .split(',')
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0);

        setVideoTags(tagsArray);
    };

    const removeTag = (indexToRemove) => {
        const newTags = videoTags.filter((_, index) => index !== indexToRemove);
        setVideoTags(newTags);
        setRawTags(newTags.join(', '));
    };

    const onCancelClick = () => {
        setVideoName();
        setVideoDescription();
        setPreview();
        setVideoTags([]);
        setVideo(null);
    };

    const onPreviewChange = (e) => {
        const file = e.target.files[0];
        if (file && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
            setPreview(file);
            setShowPreview(URL.createObjectURL(file));
        } else {
            alert('Можно загружать только файлы PNG, JPEG, JPG');
        }
    };

    const onVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && ['video/mp4', 'video/webm'].includes(file.type)) {
            setVideo(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
        } else {
            alert('Можно загружать только файлы MP4 и WebM');
        }
    };

    const onSaveClick = async () => {
        if (!video || !videoName || !videoAccess || !videoCategory) {
            alert('Пожалуйста, заполните обязательные поля: видео, название, доступ и категорию');
            return;
        }

        const formData = new FormData();
        formData.append('video', video);
        formData.append('name', videoName);
        formData.append('tags', JSON.stringify(videoTags));
        formData.append('id_access', videoAccess);
        formData.append('id_category', videoCategory.id);
        if (videoDescription) {
            formData.append('description', videoDescription);
        }

        if (preview && preview instanceof File) {
            formData.append('preview', preview);
        }

        if (videoPlaylist) {
            formData.append('id_playlist', videoPlaylist.id);
        }

        try {
            const answer = confirm('Вы уверены, что хотите загрузить видео?');
            if (!answer) return;

            const response = await apiRequest('/main/videos/upload', 'POST', formData, true);

            if (response.status === 200) {
                alert('Видео успешно загружено');
            } else {
                alert(`Ошибка загрузки видео`);
                console.error(`${response.message || 'Неизвестная ошибка'}`);
            }
        } catch (error) {
            console.error('Ошибка при отправке видео:', error);
            alert('Произошла ошибка при загрузке видео');
        }
    };

    const onDeleteImage = () => {
        setPreview(null);
        setShowPreview(null);
    };

    return (
        <div className={m.container}>
            <div className={m.videoContainer}>
                <PreloadVideo title={videoName} channelName={user.username}
                    preview={showPreview || '../../../images/preview.jpg'} channelImage={user.avatar_url}
                    views='0' loadDate={new Date()} description={videoDescription} />
            </div>
            <div className={m.otherInfoContainer}>
                <div>
                    <p className={m.title}>Выберите видео</p>
                    <input type='file' accept='.mp4,.webm' onChange={onVideoChange}></input>
                    {videoPreviewUrl && (
                        <div style={{ marginTop: '10px' }}>
                            <ReactPlayer
                                url={videoPreviewUrl}
                                controls
                                width="100%"
                                height="300px"
                            />
                        </div>
                    )}
                </div>
                <div className={m.textField}>
                    <p className={m.title}>Название</p>
                    <input type='text' className={m.name} value={videoName} onChange={(e) => setVideoName(e.target.value)}></input>
                </div>
                <div className={m.textField}>
                    <p className={m.title}>Описание</p>
                    <textarea className={m.description} value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <p className={m.title}>Превью</p>
                    <div className={m.headerContainer}>
                        <div className={m.headerSubContainer}>
                            <input type='file' accept='.png,.jpeg,.jpg' hidden onChange={(e) => onPreviewChange(e)} className={m.fileSelect}></input>
                            <img src={showPreview || '../../../images/preview.jpg'} className={m.header}></img>
                            <img src={'../../images/edit.png'} className={m.edit}></img>
                        </div>
                        <div className={m.trashboxContainer} style={{ marginLeft: '20px' }} onClick={() => onDeleteImage()}>
                            <img src={'../../images/basket.png'} className={m.trashbox}></img>
                        </div>
                    </div>
                    <p>Выберите картинку, которая будет привлекать зрителей</p>
                </div>
                <ComboBox title='Добавить в плейлист' onChange={setVideoPlaylist} options={playlists}></ComboBox>
                <ComboBox title='Категория' onChange={setVideoCategory} options={categories}></ComboBox>
                <div className={m.textField}>
                    <p className={m.title}>Теги</p>
                    <textarea
                        className={m.description}
                        value={rawTags}
                        onChange={onTagsChange}
                        placeholder="Введите теги через запятую"
                    />
                    <p className={m.caption}>По тегам пользователи смогут найти ваше видео</p>
                    <div className={m.tagsPreview}>
                        {videoTags.map((tag, index) => (
                            <span key={index} className={m.tag} onClick={() => removeTag(index)}>
                                #{passPartOfText(tag, 85)} ✕
                            </span>
                        ))}
                    </div>
                </div>

                <fieldset>
                    <legend className={m.title}>Доступ к видео</legend>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setVideoAccess(1)} />
                        Открытый
                    </label><br></br>
                    <label className={m.radio}>
                        <input type="radio" name="answer" onChange={() => setVideoAccess(2)} />
                        Закрытый (доступно только вам)
                    </label>
                </fieldset>
                <div className={m.changeButtons}>
                    <button className={m.headerButton} onClick={onSaveClick}>Опубликовать</button>
                    <button className={m.headerButton} onClick={onCancelClick}>Отменить</button>
                </div>
            </div>
        </div >
    );
}

export default AddVideo;