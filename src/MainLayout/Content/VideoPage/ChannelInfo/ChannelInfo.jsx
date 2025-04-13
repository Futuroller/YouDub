import { useSelector } from 'react-redux';
import { API_URL_FILES } from '../../../../config';
import setWordEnding from '../../../../utils/setWordEnding'
import m from './ChannelInfo.module.css'

function ChannelInfo(props) {
    const user = useSelector((state) => state.user);
    return (
        <div className={m.container}>
            <img src={props.avatar ? `${API_URL_FILES}/avatars/${props.avatar}` : '../../../images/userDefault.png'} className={m.channelImage}></img>
            <div className={m.infoBlock}>
                <h2 className={m.channelName}>{props.username}</h2>
                <p className={m.subs}>{setWordEnding(props.subscribers, 'подписчик', '', 'a', 'ов')}</p>
            </div>
        </div>
    );
}

export default ChannelInfo;