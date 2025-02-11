import m from './Content.module.css'
import Video from './Video/Video';

function Content(props) {

    let videosList = props.content.videos.map(v => (
        <Video title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.content}>
            {videosList}
        </div>
    );
}

export default Content;
