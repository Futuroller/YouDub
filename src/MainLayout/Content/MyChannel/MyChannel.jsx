import ButtonsBlock from './ButtonsBlock/ButtonsBlock';
import ChannelHeader from './ChannelHeader/ChannelHeader';
import Video from '../Video/Video'
import m from './MyChannel.module.css'

function MyChannel(props) {

    let videosList = props.content.videos.map(v => (
        <Video key={v.id} title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            <div className={m.withoutVideoContainer}>
                <ChannelHeader myChannel={props.content.videos[0]} />
                <ButtonsBlock />
                <p className={m.label}>Популярное</p>
            </div>
            <div className={m.videos}>
                {videosList}
            </div>
        </div>
    );
}

export default MyChannel;