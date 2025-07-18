import { fetchVideos } from '../../../store/slices/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Video from '../Video/Video';
import m from './MainPage.module.css'
import { API_URL_FILES } from '../../../config';

function MainPage({ contentRef }) {
    const dispatch = useDispatch();
    const { allVideos, recommendationsStatus } = useSelector(state => state.videos);
    const user = useSelector(state => state.user);
    const isCollapsed = useSelector(state => state.ui.isNavbarCollapsed);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVideos({ page, limit: 12 }));
    }, []);

    const loadMore = async () => {
        if (isFetchingMore || recommendationsStatus.isLoading) return;
        setIsFetchingMore(true);

        const action = await dispatch(fetchVideos({ page, limit: 12 }));
        const newVideos = action.payload;

        if (!newVideos || newVideos.length === 0) {
            setHasMore(false);
        } else {
            setPage(prev => prev + 1);
        }

        setIsFetchingMore(false);
    };

    const handleScroll = () => {
        const element = contentRef.current;
        if (!element || isFetchingMore || recommendationsStatus.isLoading || !hasMore) return;

        const { scrollTop, clientHeight, scrollHeight } = element;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMore();
        }
    };

    useEffect(() => {
        const current = contentRef.current;
        if (!current) return;

        current.addEventListener('scroll', handleScroll);
        return () => current.removeEventListener('scroll', handleScroll);
    }, [isFetchingMore, recommendationsStatus.isLoading]);

    // if (recommendationsStatus.isLoading) return <h1>Загрузка...</h1>;
    if (recommendationsStatus.error) return <h1>Ошибка: {recommendationsStatus.error}</h1>;

    let videosList = allVideos.map(v => (
        <Video key={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} progressPercent={v.progress_percent} idUserRole={user.id_role} />
    ));

    return (
        <div className={`${m.container} ${isCollapsed ? m.expanded : m.narrow}`}>
            <div className={m.videos}>
                {videosList.length > 0 ?
                    videosList :
                    <p className={m.caption}>Выберите больше любимых категорий через настройки канала</p>}
            </div>
            <div className={m.botomCaption}>
                {isFetchingMore && hasMore && <p className={m.loadingData}>Загрузка...</p>}
                {!hasMore && <p className={m.noMore}>Загрузите свои видео, чтобы их стало больше!</p>}
            </div>
        </div>
    );
}

export default MainPage;