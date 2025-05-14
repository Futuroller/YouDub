import { fetchAllPlaylists, clearPlaylists } from '../../../store/slices/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import m from './PlaylistsPage.module.css'
import Playlist from './Playlist/Playlist';
import { NavLink } from 'react-router-dom';

function PlaylistsPage() {
    const dispatch = useDispatch();
    const { allPlaylists, status } = useSelector(state => state.playlists);

    useEffect(() => {
        dispatch(fetchAllPlaylists());

        return () => {
            dispatch(clearPlaylists());
        };
    }, []);

    if (status.isLoading) return <h1>Загрузка плейлистов...</h1>;
    if (status.error) return <h1>Ошибка: {status.error}</h1>;
    if (allPlaylists.length === 0 && status.success) return <h1>Плейлистов пока нет 🫠</h1>;

    return (
        <div className={m.container}>
            <p className={m.title}>Плейлисты</p>
            <div className={m.videoContainer}>
                {allPlaylists.map(p => (
                    <Playlist
                        key={p.id}
                        title={p.name}
                        channelName={p.channelName}
                        preview={p.name == 'Понравившиеся' ?
                            '../../../../images/like.png' :
                            p.name == 'Смотреть позже' ?
                                '../../../../images/watchLaterIcon.png' :
                                '../../../../images/playlistIcon.png'}
                        channelImage={p.channelImage}
                        access_status={p.access_status}
                        url={p.url}
                        videosCount={p.videosCount}
                        canEdit={!p.isDefault}
                    />
                ))}
                <NavLink to={'/main/my-channel/add-playlist'}
                    className={m.addPlaylistButton} title='Создать плейлист'>
                    <img src='../images/plus.png' />
                </NavLink>
            </div>
        </div>
    );
}

export default PlaylistsPage;