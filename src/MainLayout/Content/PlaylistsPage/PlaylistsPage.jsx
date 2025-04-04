import { fetchAllPlaylists, clearPlaylists } from '../../../store/slices/playlistsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Video from '../Video/Video';
import m from './PlaylistsPage.module.css'
import Playlist from './Playlist/Playlist';

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
                        preview={p.preview}
                        channelImage={p.channelImage}
                        access_status={p.access_status}
                        videosCount={p.videosCount}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlaylistsPage;