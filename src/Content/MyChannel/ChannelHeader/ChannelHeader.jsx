import m from './ChannelHeader.module.css'

function ChannelHeader(props) {
    return (
        <div className={m.container}>
            <div className={m.subContainer}>
                <img src={props.myChannel.channelImage} className={m.channelImage}></img>
                <div className={m.channelInfo}>
                    <p className={m.channelName}>{props.myChannel.channelName}</p>
                    <div className={m.tagAndStat}>
                        <p>тэг канала</p>
                        <p>0 подписчиков</p>
                        <p>0 видео</p>
                    </div>
                    <p className={m.aboutChannel}>О канале...</p>
                </div>
                <div className={m.buttonContainer}>
                    <button>Настроить вид канала</button>
                </div>
            </div>
        </div>
    );
}

export default ChannelHeader;