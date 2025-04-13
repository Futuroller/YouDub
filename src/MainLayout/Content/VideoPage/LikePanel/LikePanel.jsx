import getMeasurementUnit from '../../../../utils/getMeasurementUnit';
import m from './LikePanel.module.css'

function LikePanel(props) {

    return (
        <div className={m.container} style={{ height: props.height }}>
            <div className={m.likeContainer}>
                <img src='../../../../images/like.png' alt="like" className={m.like} />
                <p className={m.statCount}>{getMeasurementUnit(props.likes)}</p>
            </div>
            <div className={m.verticalLine}></div>
            <div className={m.likeContainer}>
                <img src='../../../../images/dislike.png' alt="dislike" className={m.dislike} />
                <p className={m.statCount}>{getMeasurementUnit(props.dislikes)}</p>
            </div>
            {props.hasShare ? <div className={m.verticalLine}></div> : ''}
            {props.hasShare ? <div className={m.shareContainer}>
                <img src='../../../../images/share.png' alt="share" className={m.share} />
            </div> : ''}
        </div >
    );
}

export default LikePanel;