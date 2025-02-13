import m from './MainPage.module.css'
import Video from '../Video/Video';

function MainPage(props) {

    let videosList = props.content.videos.map(v => (
        <Video title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <>
            {videosList}
        </>
    );
}

export default MainPage;