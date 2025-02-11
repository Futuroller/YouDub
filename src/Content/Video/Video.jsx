import m from './Video.module.css'

function Video(props) {

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>

            <div className={m.underPreview}>
                <img src={props.channelImage} className={m.channelImage}></img>
                <div className={m.videoDescription}>
                    <p className={m.title}>{props.title}</p>
                    <p className={m.channelName}>{props.channelName}</p>
                </div>
            </div>
        </div>
    );
}

export default Video;
