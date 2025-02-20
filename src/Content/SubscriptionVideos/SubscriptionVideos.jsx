import Video from '../Video/Video';
import m from './SubscriptionVideos.module.css'

function SubscriptionVideos(props) {

    let videosList = props.content.videos.map(v => (
        <Video key={v.id} title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            <p className={m.title}>Новое</p>
            <div className={m.videosContainer}>
                {videosList}
            </div>
        </div>

    );
}

export default SubscriptionVideos;