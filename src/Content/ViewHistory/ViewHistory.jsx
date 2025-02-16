import m from './ViewHistory.module.css'

function ViewHistory(props) {

    let videosList = props.content.videos.map(v => (
        <Video title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            <p className={m.title}></p>
        </div>
    );
}

export default ViewHistory;