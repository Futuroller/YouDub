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

function VideoPage(props) {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    const dispatch = useDispatch();
    const { currentVideo, isLoading, error } = useSelector(state => state.videos);
    const { allComments } = useSelector(state => state.comments);

    console.log(allComments)

    useEffect(() => {
        dispatch(fetchVideoByUrl(lastSegment));
        dispatch(fetchComments(lastSegment));
        return () => {
            dispatch(clearCurrentVideo());
        };
    }, [lastSegment]);

    const [menuItems, setMenuItems] = useState([
        { id: 1, text: 'Перейти на канал', picture: '../../../images/mainIcon.png' },
        { id: 2, text: 'Настройки', picture: '../../../images/followChannelsIcon.png' },
        { id: 3, text: 'Выйти из аккаунта', picture: '../../../images/followChannelsIcon.png' }
    ]);

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

    const [comment, setComment] = useState('');

    const onDescriptionChange = (e) => {
        const text = e.target.value;
        setComment(text);
    };

    if (!currentVideo.users) return <h1 className={m.loadingData}>Загрузка...</h1>;
    if (error) return <h1>Ошибка: {error}</h1>;

    const { name, description, url, load_date,
        views, likes, dislikes, ownerSubscribersCount } = currentVideo;
    const { username, avatar_url } = currentVideo.users;

    let commentsList;
    if (allComments) {
        commentsList = allComments.map(c => (
            <Comment key={c.id} text={c.comment_text} likes={c.likes} dislikes={c.dislikes}
                commentDate={c.comment_date} ownerName={c.users.username}
                avatar={c.users.avatar_url} />
        ));
    }

    return (
        <div className={m.container}>
            <div className={m.videoContainer}>
                <ReactPlayer
                    url={`${API_URL_FILES}videos/${url}`}
                    controls
                    playing={true}
                    width="100%"
                    height="100%"
                />
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
                    <ChannelInfo username={username}
                        subscribers={ownerSubscribersCount} avatar={avatar_url} />
                    <button className={m.myChannelButton}>Подписаться</button>
                </div>
                <div className={m.leftSide}>
                    <LikePanel likes={likes} dislikes={dislikes} hasShare={true} />
                    <div>
                        <div className={m.options} ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
                            <img src='../../../../images/playlistsIcon.png' alt="share" className={m.playlists} />
                            <img src='../../../../images/plus.png' alt="share" className={m.plus} />
                        </div>
                        <div className={m.menuContainer} ref={menuRef}>
                            {isOpen && <DropdownMenu menuItems={menuItems} top={'10px'} left={'-150px'} />}
                        </div>
                    </div>
                </div>
            </div>
            <div className={m.line} />
            <div className={m.descpiptionContainer}>
                <p className={m.descpiption}>{description}</p>
            </div>
            <h2>{setWordEnding(allComments.length, 'комментари', 'й', 'я', 'ев')}</h2>
            <div className={m.leaveComment}>
                <img src={user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
                <textarea className={m.commentField} value={comment} onChange={onDescriptionChange}></textarea>
            </div>
            <div className={m.commentsContainer}>
                {commentsList}
            </div>
        </div >
    );
}

export default VideoPage;