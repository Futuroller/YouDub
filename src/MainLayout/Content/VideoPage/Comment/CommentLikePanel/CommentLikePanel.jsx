import { useState } from 'react';
import getMeasurementUnit from '../../../../../utils/getMeasurementUnit';
import m from './CommentLikePanel.module.css'

function CommentLikePanel(props) {
    const [reaction, setReaction] = useState(null);
    const [likesCount, setLikesCount] = useState(props.likes);
    const [dislikesCount, setDislikesCount] = useState(props.dislikes);

    const onReactionClick = (newReaction) => {
        if (reaction === newReaction) {
            setReaction(null);
            if (newReaction === 'like') setLikesCount(prev => prev - 1);
            else setDislikesCount(prev => prev - 1);
        } else {
            if (newReaction === 'like') {
                setLikesCount(prev => prev + 1);
                if (reaction === 'dislike') setDislikesCount(prev => prev - 1);
            } else {
                setDislikesCount(prev => prev + 1);
                if (reaction === 'like') setLikesCount(prev => prev - 1);
            }
            setReaction(newReaction);
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