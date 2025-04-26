import { useDispatch, useSelector } from 'react-redux';
import { API_URL_FILES } from '../../../../config';
import m from './Comment.module.css'
import getTimeline from '../../../../utils/getTimeline';
import CommentLikePanel from './CommentLikePanel/CommentLikePanel';
import { useState } from 'react';
import { removeComment } from '../../../../store/slices/commentsSlice';
import apiRequest from '../../../../api/apiRequest';

function Comment(props) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const [isUserOwner, setIsUserOwner] = useState(props.videoOwnerId === user.id ? true : false);
    const [isUserCommentator, setШsUserCommentator] = useState(props.commentOwnerId === user.id ? true : false);

    const handleDelete = async (e, commentId) => {
        try {
            const answer = confirm('Вы уверены, что хотите удалить комментарий?');
            if (!answer) return;
            const deletedComment = await apiRequest(`/main/comments/${commentId}`, 'DELETE');
            dispatch(removeComment(commentId));
        } catch (error) {
            console.error("Ошибка при удалении " + error);
        }
    };

    return (
        <div className={m.container}>
            <img src={props.avatar ? `${API_URL_FILES}avatars/${props.avatar}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
            <div className={m.comment}>
                <div className={m.topSide}>
                    <div className={m.subContainer}>
                        <h3 className={m.channelName}>{props.ownerName}</h3>
                        <p className={m.timeAgo}>{getTimeline(props.commentDate)}</p>
                    </div>
                    {(isUserOwner || isUserCommentator) ? <button className={m.deleteButton} title='Удалить комментарий' onClick={(e) => handleDelete(e, props.id)}></button> : ''}
                </div>
                <p className={m.text}>{props.text}</p>
                <CommentLikePanel commentId={props.id} likes={props.likes} dislikes={props.dislikes} height='40px' currentReaction={props.currentReaction} />
            </div>
        </div >
    );
}

export default Comment;