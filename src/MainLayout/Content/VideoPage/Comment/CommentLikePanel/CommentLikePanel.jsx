import { useState } from 'react';
import getMeasurementUnit from '../../../../../utils/getMeasurementUnit';
import m from './CommentLikePanel.module.css'
import apiRequest from '../../../../../api/apiRequest';

function CommentLikePanel(props) {
    const [reaction, setReaction] = useState(props.currentReaction);
    const [likesCount, setLikesCount] = useState(props.likes ? props.likes : 0);
    const [dislikesCount, setDislikesCount] = useState(props.dislikes ? props.dislikes : 0);

    const onReactionClick = async (newReaction) => {
            let updatedReaction = null;
    
            if (reaction === newReaction) {
                updatedReaction = null;
                setReaction(null);
                if (newReaction === 'like') {//когда убираешь луйк
                    setLikesCount(prev => prev - 1);
                }
                else {//когда убираешь дизлуйк
                    setDislikesCount(prev => prev - 1);
                }
            } else {
                updatedReaction = newReaction;
                setReaction(newReaction);
                if (newReaction === 'like') {
                    setLikesCount(prev => prev + 1);
                    if (reaction === 'dislike') setDislikesCount(prev => prev - 1);
                } else {
                    setDislikesCount(prev => prev + 1);
                    if (reaction === 'like') setLikesCount(prev => prev - 1);
                }
            }
            const response = await apiRequest(`/main/comments/reaction/${props.commentId}`, 'PATCH', { reaction: updatedReaction });
            if (response.status !== 200) {
                console.error('Вы не можете поставить реакцию: ' + response.message);
            }
        };

    const likeIcon = reaction === 'like'
        ? '../../../../images/pushedLike.png'
        : '../../../../images/like.png';

    const dislikeIcon = reaction === 'dislike'
        ? '../../../../images/pushedDislike.png'
        : '../../../../images/dislike.png';

    return (
        <div className={m.container} style={{ height: props.height }}>
            <div className={m.likeContainer}>
                <img src={likeIcon} alt="like" className={m.like} onClick={() => onReactionClick('like')} />
                <p className={m.statCount}>{getMeasurementUnit(likesCount)}</p>
            </div>
            <div className={m.verticalLine}></div>
            <div className={m.likeContainer}>
                <img src={dislikeIcon} alt="dislike" className={m.dislike} onClick={() => onReactionClick('dislike')} />
                <p className={m.statCount}>{getMeasurementUnit(dislikesCount)}</p>
            </div>
        </div >
    );
}

export default CommentLikePanel;