import m from './WideVideo.module.css'

function WideVideo(props) {

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>

            <div className={m.videoInfo}>
                <div className={m.subContainer}>
                    <p className={m.title}>{props.title}</p>
                    <div className={m.nameViews}>
                        <p>{props.channelName}</p>
                        <p>{props.views}</p>
                    </div>
                </div>
                <p className={m.description}>{props.description}</p>
            </div>
            <div className={m.buttons}>
                <button className={m.deleteButton}></button>
                <button className={m.moreButton}></button>
            </div>
        </div>
    );
}

export default WideVideo;
