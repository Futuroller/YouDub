import { fetchVideos, clearVideos } from '../../../store/slices/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Video from '../Video/Video';
import m from './MainPage.module.css'

function MainPage(props) {

    const dispatch = useDispatch();
    const { allVideos, isLoading, error } = useSelector(state => state.videos);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVideos({ page, limit: 10 }));
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

    let videosList = allVideos.map(v => (
        <Video key={v.id} title={v.name} channelName={v.owner_username}
            preview={v.preview} channelImage={v.owner_channel_image}
            views={v.views} loadDate={v.load_date} />
    ));

    return (
        <div className={m.container}>
            {videosList}
        </div>
    );
}

export default MainPage;