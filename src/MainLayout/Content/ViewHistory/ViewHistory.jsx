import { fetchHistory, clearVideos, removeHistoryVideo, clearHistoryVideos } from '../../../store/slices/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import WideVideo from '../WideVideo/WideVideo';
import m from './ViewHistory.module.css'
import { API_URL_FILES } from '../../../config';
import { formatDateGroup } from '../../../utils/formatDateGroup';
import MenuItem from '../../MenuItem/MenuItem';

function ViewHistory(props) {

    const [sideMenu, setSideMenu] = useState([
        { id: 1, title: 'Очистить историю просмотра', picture: '../images/basket.png' },
    ]);

    const dispatch = useDispatch();
    const { watchHistory, isLoading, error } = useSelector(state => state.videos);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchHistory({ page, limit: 10 }));

        return () => {
            dispatch(clearHistoryVideos());
        }
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

    const groupedVideos = watchHistory.reduce((acc, video) => {
        const group = formatDateGroup(video.watched_at);
        if (!acc[group]) acc[group] = [];
        acc[group].push(video);
        return acc;
    }, {});

    const renderGroupedVideos = () => {
        return Object.entries(groupedVideos).map(([groupTitle, videos]) => (
            <div key={groupTitle} className={m.dateGroupBlock}>
                <h2 className={m.dateGroup}>{groupTitle}</h2>
                {videos.map(v => (
                    <WideVideo key={v.id} id={v.id} title={v.name} description={v.description} channelName={v.owner_username}
                        preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
                        channelImage={v.owner_channel_image} url={v.url}
                        views={v.views} loadDate={v.load_date} />
                ))}
            </div>
        ));
    };

    const onDeleteHistory = async () => {
        const answer = confirm('Вы уверены что хотите очистить историю?');
        if (!answer) return;
        const response = await apiRequest('/main/history', 'DELETE');
        if (response.status !== 200) {
            alert('Ошибка удаления истории просмотра');
            return;
        }
        dispatch(clearHistoryVideos());
    };

    if (isLoading) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (error) return <h1>Ошибка: {error}</h1>;

    return (
        <div className={m.container}>
            <p className={m.title}>История просмотра</p>
            {watchHistory.length > 0 && <MenuItem key={1} picture='../images/basket.png' title='Очистить историю просмотра'
                onClickHandler={onDeleteHistory} caption='Очистить историю просмотра' />}
            <div className={m.content}>
                <div className={m.videos}>
                    {watchHistory.length > 0 ? renderGroupedVideos() : <p className={m.caprion}>История просмотра пуста</p>}
                </div>
            </div>
        </div>
    );
}

export default ViewHistory;