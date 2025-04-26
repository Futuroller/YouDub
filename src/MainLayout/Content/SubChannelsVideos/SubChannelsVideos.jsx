import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Video from '../Video/Video';
import m from './SubChannelsVideos.module.css'
import { clearVideosFromSubChannel, fetchVideosFromSubChannels } from '../../../store/slices/videosSlice';
import { API_URL_FILES } from '../../../config';

function SubChannelsVideos(props) {
    const dispatch = useDispatch();
    const { subscriptions, isLoading, error } = useSelector(state => state.videos);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVideosFromSubChannels({ page, limit: 10 }));

        return () => {
            dispatch(clearVideosFromSubChannel());
        };
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

    console.log(subscriptions);

    let videosList = subscriptions.map(v => (
        <Video key={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />)
    );

    return (
        <div className={m.container}>
            <p className={m.title}>Видео с каналов, на которые вы подписаны</p>
            <div className={m.videosContainer}>
                {videosList.length > 0 ? videosList : <p className={m.caption}>Пока видеороликов нет</p>}
            </div>
        </div>
    );
}

export default SubChannelsVideos;