import ChannelHeader from './ChannelHeader/ChannelHeader';
import Video from '../Video/Video';
import MyChannelButton from './MyChannelButton/MyChannelButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import m from './ChannelPage.module.css';
import { clearChannelVideos, clearVideos, fetchVideosFromChannel } from '../../../store/slices/videosSlice';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { API_URL_FILES } from '../../../config';
import { clearCurrentChannel, fetchChannelByTagname } from '../../../store/slices/channelsSlice';

function ChannelPage(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { channelVideos, isLoading, error } = useSelector(state => state.videos);
    const { currentChannel, currentChannelStatus } = useSelector(state => state.channels);
    const isCollapsed = useSelector(state => state.ui.isNavbarCollapsed);

    const onAddVideoClick = () => {
        navigate('/main/my-channel/add-video');
    };

    const onAddPlaylistClick = () => {
        navigate('/main/my-channel/add-playlist');
    };

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVideosFromChannel(lastSegment, { page, limit: 10 }));
        dispatch(fetchChannelByTagname(lastSegment));

        return () => {
            dispatch(clearChannelVideos());
            dispatch(clearCurrentChannel());
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

    if (isLoading) return <h1 className={m.loadingData}></h1>;
    if (error) return <h1>Ошибка: {error}</h1>;
    if (currentChannelStatus.isLoading) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (currentChannelStatus.error) return <h1>Ошибка: {error}</h1>;

    let videosList = channelVideos.map(v => (
        <Video key={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />
    ));

    console.log(currentChannel)

    return (
        <div className={m.container}>
            <div className={m.withoutVideoContainer}>
                <ChannelHeader channel={currentChannel} />
                {currentChannel.tagname === user.tagname ? <div className={m.buttonsContainer}>
                    <MyChannelButton buttonText='Добавить видео' OnClickHandler={onAddVideoClick} icon='../../../images/addVideo.png' />
                    <MyChannelButton buttonText='Создать плейлист' OnClickHandler={onAddPlaylistClick} icon='../../../images/playlistsIcon.png' />
                </div> : ''}
                <Outlet />
                <p className={m.label}>Видео</p>
            </div>
            <div className={`${m.videos} ${isCollapsed ? m.expanded : m.narrow}`}>
                {videosList.length > 0 ? videosList : <p className={m.caption}>На канале нет видеороликов</p>}
            </div>
        </div>
    );
}

export default ChannelPage;