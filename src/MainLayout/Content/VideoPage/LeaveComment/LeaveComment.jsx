import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import m from './LeaveComment.module.css'
import { fetchComments } from '../../../../store/slices/commentsSlice';
import { API_URL_FILES } from '../../../../config';
import apiRequest from '../../../../api/apiRequest';

function LeaveComment(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [comment, setComment] = useState('');

    const onCommentChange = (e) => {
        const text = e.target.value;
        setComment(text);
    };

    const onSendClick = async () => {
        try {
            const response = await apiRequest(`/main/comments/${props.url}`, 'POST', { comment });

            if (response.status === 200) {
                dispatch(fetchComments(props.url));
                setComment('')
            } else {
                console.log(`Ошибка: ${response.message}`);
            }
        } catch (error) {
            console.error(`Ошибка при оставлении комментария: ${error}`);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (comment.trim().length > 0) {
                onSendClick();
            }
        }
    };

    return (
        <div className={m.container}>
            <img src={user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
            <textarea className={m.commentField} value={comment} onChange={onCommentChange} onKeyDown={handleKeyDown}></textarea>
            {comment.length > 0 ? <img src='../../../images/sendComment.png' className={m.sendButton} onClick={onSendClick}></img> : ''}
        </div>
    );
}

export default LeaveComment;