import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Video from '../Video/Video';
import m from './PlaylistVideos.module.css'
import { fetchVideosFromPlaylist, clearPlaylist } from '../../../store/slices/videosSlice';
import { API_URL_FILES } from '../../../config';

function PlaylistVideos(props) {

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const dispatch = useDispatch();
    const { playlists, isLoading, error } = useSelector(state => state.videos);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVideosFromPlaylist(lastSegment, { page, limit: 10 }));

        return () => {
            dispatch(clearPlaylist());
        };
    }, [page, lastSegment]);

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

    let videosList = playlists.map(v => (
        <Video key={v.id} title={v.name} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />)
    );

    return (
        <div className={m.container}>
            <p className={m.title}>Понравившиеся</p>
            <div className={m.videosContainer}>
                {videosList}
            </div>
        </div>
    );
}

export default PlaylistVideos;