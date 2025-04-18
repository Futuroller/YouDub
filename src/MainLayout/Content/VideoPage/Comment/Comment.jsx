import { useSelector } from 'react-redux';
import { API_URL_FILES } from '../../../../config';
import m from './Comment.module.css'
import getTimeline from '../../../../utils/getTimeline';
import CommentLikePanel from './CommentLikePanel/CommentLikePanel';

function Comment(props) {
    const user = useSelector((state) => state.user);

    return (
        <div className={m.container}>
            <img src={props.avatar ? `${API_URL_FILES}avatars/${props.avatar}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
            <div className={m.comment}>
                <div className={m.topSide}>
                    <h3 className={m.channelName}>{props.ownerName}</h3>
                    <p className={m.timeAgo}>{getTimeline(props.commentDate)}</p>
                </div>
                <p className={m.text}>{props.text}</p>
                <CommentLikePanel likes={props.likes} dislikes={props.dislikes} height='40px' />
            </div>
        </div >
    );
}

export default Comment;