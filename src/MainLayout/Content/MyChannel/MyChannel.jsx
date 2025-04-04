import ChannelHeader from './ChannelHeader/ChannelHeader';
import Video from '../Video/Video';
import MyChannelButton from './MyChannelButton/MyChannelButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import m from './MyChannel.module.css';
import { fetchMyVideos } from '../../../store/slices/videosSlice';
import { Outlet, useNavigate } from 'react-router-dom';

function MyChannel(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myVideos, isLoading, error } = useSelector(state => state.videos);

    const onAddVideoClick = () => {
        navigate('/main/my-channel/add-video');
    };

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchMyVideos({ page, limit: 10 }));
    }, [page]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 50 && !isLoading) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isLoading) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (error) return <h1>Ошибка: {error}</h1>;

    let videosList = myVideos.map(v => (
        <Video key={v.id} title={v.name} channelName={v.owner_username}
            preview={v.preview} channelImage={v.owner_channel_image}
            views={v.views} loadDate={v.load_date} />
    ));

    return (
        <div className={m.container}>
            <div className={m.withoutVideoContainer}>
                <ChannelHeader myChannel={props.content.videos[0]} />
                <div className={m.buttonsContainer}>
                    <MyChannelButton buttonText='Добавить видео' OnClickHandler={onAddVideoClick} />
                    <MyChannelButton buttonText='Плейлисты' />
                </div>
                <Outlet />
                <p className={m.label}>Популярное</p>
            </div>
            <div className={m.videos}>
                {videosList}
            </div>
        </div>
    );
}

export default MyChannel;