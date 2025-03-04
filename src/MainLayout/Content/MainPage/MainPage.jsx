import Video from '../Video/Video';
import m from './MainPage.module.css'

function MainPage(props) {

    let videosList = props.content.videos.map(v => (
        <Video key={v.id} title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            {videosList}
        </div>
    );
}

export default MainPage;