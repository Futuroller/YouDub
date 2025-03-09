import { useSelector } from 'react-redux';
import m from './ChannelHeader.module.css'

function ChannelHeader(props) {
    const user = useSelector((state) => state.user);

    return (
        <div className={m.container}>
            <div className={m.subContainer}>
                <img src={user.avatar_url || '/images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.channelInfo}>
                    <p className={m.channelName}>{user.username}</p>
                    <div className={m.tagAndStat}>
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