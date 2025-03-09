import { useSelector } from 'react-redux';
import m from './Channel.module.css'

function Channel() {
    const user = useSelector((state) => state.user);
    return (
        <div className={m.container}>
            <img src={user.avatar_url || '/images/userDefault.png'} className={m.channelImage}></img>
            <p className={m.channelTitle}>{user.username}</p>
        </div>
    );
}

export default Channel;
