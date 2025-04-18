import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Video from '../Video/Video';
import m from './PlaylistVideos.module.css'
import { fetchVideosFromPlaylist, clearPlaylist } from '../../../store/slices/videosSlice';
import { API_URL_FILES } from '../../../config';
import { clearCurrentPlaylist, fetchPlaylistByUrl } from '../../../store/slices/playlistsSlice';

function PlaylistVideos(props) {

    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const dispatch = useDispatch();
    const { playlists, isLoading, error } = useSelector(state => state.videos);
    const [page, setPage] = useState(1);

    const { currentPlaylist, status } = useSelector(state => state.playlists);

    useEffect(() => {
        dispatch(fetchVideosFromPlaylist(lastSegment, { page, limit: 10 }));
        dispatch(fetchPlaylistByUrl(lastSegment));

        return () => {
            dispatch(clearPlaylist());
            dispatch(clearCurrentPlaylist());
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
    if (status.error) return <h2>{status.error}</h2>;

    let videosList = playlists.map(v => (
        <Video key={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />)
    );

    return (
        <div className={m.container}>
            <p className={m.title}>{currentPlaylist.name ? currentPlaylist.name : 'Видео с каналов, на которые вы подписаны'}</p>
            <div className={m.videosContainer}>
                {videosList.length > 0 ? videosList : <p className={m.caption}>Пока видеороликов нет</p>}
            </div>
        </div>
    );
}

export default PlaylistVideos;