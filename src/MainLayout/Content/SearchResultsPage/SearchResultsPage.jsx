import { clearSearchVideos, clearVideos, fetchSearchVideos } from '../../../store/slices/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Video from '../Video/Video';
import m from './SearchResultsPage.module.css'
import { API_URL_FILES } from '../../../config';
import { useLocation } from 'react-router-dom';

function SearchResultsPage({ contentRef }) {
    const location = useLocation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState(new URLSearchParams(location.search).get('query') || '');

    const { searchVideos, searchStatus } = useSelector(state => state.videos);
    const isCollapsed = useSelector(state => state.ui.isNavbarCollapsed);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const newQuery = new URLSearchParams(location.search).get('query') || '';

        setQuery(newQuery);
        setPage(1);
        setHasMore(true)
        dispatch(clearSearchVideos());
        if (newQuery) {
            dispatch(fetchSearchVideos({ searchQuery: newQuery, page, limit: 12 }));
        }
    }, [location.search, dispatch]);

    const loadMore = async () => {
        if (isFetchingMore || searchStatus.isLoading || !hasMore) return;
        setIsFetchingMore(true);

        const action = await dispatch(fetchSearchVideos({ searchQuery: query, page, limit: 12 }));
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
        if (!element || isFetchingMore || searchStatus.isLoading || !hasMore) return;

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
    }, [isFetchingMore, searchStatus.isLoading]);

    if (searchStatus.error) return <h1>Ошибка: {searchStatus.error}</h1>;

    let videosList = searchVideos.map(v => (
        <Video key={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />
    ));

    return (
        <div className={`${m.container} ${isCollapsed ? m.expanded : m.narrow}`}>
            <div className={m.videos}>
                {videosList.length > 0 ? videosList : <p className={m.caption}>По вашему запросу ничего не нашлось</p>}
            </div>
            <div className={m.botomCaption}>
                {isFetchingMore && hasMore && <p className={m.loadingData}>Загрузка...</p>}
                {!hasMore && <p className={m.noMore}>Загрузите свои видео, чтобы их стало больше!</p>}
            </div>
        </div>
    );
}

export default SearchResultsPage;