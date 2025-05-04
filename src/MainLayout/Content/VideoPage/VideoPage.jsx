import ReactPlayer from 'react-player';
import ChannelInfo from './ChannelInfo/ChannelInfo';
import { API_URL_FILES } from '../../../config';
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import Comment from './Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchVideoByUrl, clearCurrentVideo } from '../../../store/slices/videosSlice';
import setWordEnding from '../../../utils/setWordEnding';
import getTimeline from '../../../utils/getTimeline';
import m from './VideoPage.module.css'
import { fetchComments } from '../../../store/slices/commentsSlice';
import LikePanel from './LikePanel/LikePanel';
import LeaveComment from './LeaveComment/LeaveComment';
import { fetchAllPlaylists } from '../../../store/slices/playlistsSlice';
import apiRequest from '../../../api/apiRequest';
import SubButton from './ChannelInfo/SubButton/SubButton';

function VideoPage(props) {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const dispatch = useDispatch();
    const { currentVideo, reactionForCurrentVideo, isLoading, error } = useSelector(state => state.videos);
    const user = useSelector(state => state.user);
    const { allPlaylists } = useSelector(state => state.playlists);
    const { allComments } = useSelector(state => state.comments);
    const playerRef = useRef(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false)
    const [isPaused, setIsPaused] = useState(true)


    useEffect(() => {
        dispatch(fetchVideoByUrl(lastSegment));
        dispatch(fetchComments(lastSegment));
        dispatch(fetchAllPlaylists())
        return () => {
            dispatch(clearCurrentVideo());
        };
    }, [lastSegment, dispatch]);

    useEffect(() => {
        let interval;
        if (isPlayerReady && typeof progressPercent === 'number') {
            playerRef.current.seekTo(progressPercent / 100, 'fraction');

            interval = setInterval(async () => {
                const currentProgress = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();
                const percent = Math.round((currentProgress / duration) * 100);

                if (isPaused) {
                    const response = await apiRequest(`/main/history/video/${url}`, 'PATCH', { progress_percent: percent });
                    if (response.status !== 200) alert('Ошибка обновления прогресса просмотра');
                }
            }, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        }
    }, [isPlayerReady]);

    const onPlaylistClick = async (url, inPlaylist) => {
        try {
            const method = inPlaylist ? 'DELETE' : 'PATCH';
            const response = await apiRequest(`/main/playlists/video/${url}`, method, { videoId: currentVideo.id });
            if (response.status === 200) {
                dispatch(fetchAllPlaylists());
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error('Ошибка обновления плейлиста: ' + error);
            alert('Ошибка обновления плейлиста');
        }
    };

    const isVideoInPlaylist = (playlist) => {
        return playlist.playlist_videos?.some(pv => pv.id_video === currentVideo.id);
    };

    const menuItems = allPlaylists.map(p => {
        const inPlaylist = isVideoInPlaylist(p);
        return {
            id: p.id,
            text: p.name,
            onClickHandler: () => onPlaylistClick(p.url, inPlaylist),
            picture: inPlaylist ?
                '../../../../../images/check.png' :
                '../../../../../images/plus.png'
        };
    });

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!currentVideo.users) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (error) return <h1>Ошибка: {error}</h1>;

    const { name, description, url, load_date,
        views, likes, dislikes, ownerSubscribersCount, id_owner, progressPercent } = currentVideo;
    const { username, avatar_url, tagname } = currentVideo.users;


    let commentsList;
    if (allComments) {
        commentsList = allComments.map(c => (
            <Comment key={c.id} id={c.id} text={c.comment_text} likes={c.likes} dislikes={c.dislikes}
                commentDate={c.comment_date} ownerName={c.user.username}
                avatar={c.user.avatar_url} currentReaction={c.currentUserReaction} videoOwnerId={id_owner} commentOwnerId={c.user.id} />
        ));
    }

    return (
        <div className={m.container}>
            <div className={m.videoContainer}>
                {currentVideo?.url && (
                    <ReactPlayer
                        key={currentVideo.url}
                        ref={playerRef}
                        url={`${API_URL_FILES}videos/${url}`}
                        controls
                        width="100%"
                        height="100%"
                        onReady={() => setIsPlayerReady(true)}
                        onPause={() => setIsPaused(true)}
                        onPlay={() => setIsPaused(false)}
                    />
                )}
            </div>
            <div className={m.nameAndStats}>
                <h2>{name}</h2>
                <div className={m.stats}>
                    <p className={m.leftStat}>{setWordEnding(views, 'просмотр', '', 'а', 'ов')}</p>
                    <p>{getTimeline(load_date)}</p>
                </div>
            </div>
            <div className={m.interactiveBlock}>
                <div className={m.leftSide}>
                    <ChannelInfo username={username} tagname={tagname}
                        subscribers={ownerSubscribersCount} avatar={avatar_url} />
                    {id_owner !== user.id ? <SubButton channelTagname={tagname} isUserFollowed={currentVideo.isFollowed} /> : ''}
                </div>
                <div className={m.rightSide}>
                    <LikePanel likes={likes} dislikes={dislikes} videoUrl={url} reactionId={reactionForCurrentVideo} />
                    <div>
                        <div className={m.options} ref={buttonRef} onClick={() => setIsOpen(!isOpen)} title='Добавить в плейлист'>
                            <img src='../../../../images/playlistsIcon.png' alt="playlists" className={m.playlists} />
                            <img src='../../../../images/plus.png' className={m.plus} />
                        </div>
                        <div className={m.menuContainer} ref={menuRef}>
                            {isOpen && <DropdownMenu menuItems={menuItems} top={'-280px'} left={'-150px'} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={m.line} />
            {description ? <div className={m.descpiptionContainer}>
                <p className={m.descpiption}>{description}</p>
            </div> : ''}
            <h2>{setWordEnding(allComments.length, 'комментари', 'й', 'я', 'ев')}</h2>
            <LeaveComment url={lastSegment} />
            <div className={m.commentsContainer}>
                {commentsList}
            </div>
        </div >
    );
}

export default VideoPage;