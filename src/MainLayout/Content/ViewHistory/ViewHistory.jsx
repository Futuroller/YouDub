import { fetchHistory, clearVideos, removeHistoryVideo, clearHistoryVideos } from '../../../store/slices/videosSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import WideVideo from '../WideVideo/WideVideo';
import SideMenu from './SideMenu/SideMenu';
import m from './ViewHistory.module.css'
import apiRequest from '../../../api/apiRequest';
import { API_URL_FILES } from '../../../config';

function ViewHistory(props) {

    const [sideMenu, setSideMenu] = useState([
        { id: 1, title: 'Очистить историю просмотра', picture: '../images/basket.png' },
        { id: 2, title: 'Не сохранять историю просмотра', picture: '../images/pause.png' }
    ]);

    const dispatch = useDispatch();
    const { watchHistory, isLoading, error } = useSelector(state => state.videos);

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchHistory({ page, limit: 10 }));
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

    console.log(watchHistory)

    let videosList = watchHistory.map(v => (
        <WideVideo key={v.id} id={v.id} title={v.name} description={v.description} channelName={v.owner_username}
            preview={v.preview_url ? `${API_URL_FILES}previews/${v.preview_url}` : '../../../images/preview.jpg'}
            channelImage={v.owner_channel_image} url={v.url}
            views={v.views} loadDate={v.load_date} />
    ));

    return (
        <div className={m.container}>
            <p className={m.title}>История просмотра</p>
            <p className={m.subtitle}>Сегодня</p>
            <div className={m.content}>
                <div className={m.videos}>
                    {videosList}
                </div>
                <SideMenu sideMenu={sideMenu} />
            </div>
        </div>
    );
}

export default ViewHistory;