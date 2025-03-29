import Video from '../Video/Video';
import m from './AnyVideos.module.css'

function AnyVideos(props) {

    let videosList = props.content.videos.map(v => (
        <Video key={v.id} title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            <p className={m.title}>{props.title}</p>
            <div className={m.videosContainer}>
                {videosList}
            </div>
        </div>

    );
}

export default AnyVideos;