import { useSelector } from 'react-redux';
import m from './ChannelHeader.module.css'
import { useNavigate } from 'react-router-dom';
import { API_URL_FILES } from '../../../../config';
import setWordEnding from '../../../../utils/setWordEnding';
import passPartOfText from '../../../../utils/passPartOfText';
import MyChannelButton from '../MyChannelButton/MyChannelButton';

function ChannelHeader(props) {
    const user = useSelector((state) => state.user);
    const navigator = useNavigate();

    const configureChannelHandler = () => {
        navigator('configure-channel');
    };

    return (
        <div className={m.container}>
            <img src={user.channel_header_url ? `${API_URL_FILES}/headers/${user.channel_header_url}` : '/images/channelHeader.jpg'} className={m.headerImage}></img>
            <div className={m.subContainer}>
                <img src={user.avatar_url ? `${API_URL_FILES}/avatars/${user.avatar_url}` : '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.channelInfo}>
                    <p className={m.channelName}>{user.username}</p>
                    <div className={m.tagAndStat}>
                        <p>{setWordEnding(user.subscribersCount, 'подписчик', '', 'а', 'ов')}</p>
                        <p>{setWordEnding(user.subscriptionsCount, 'подпис', 'ка', 'ки', 'ок')}</p>
                    </div>
                    <p className={m.description}>{passPartOfText(user.description, 39)}</p>
                    <p className={m.aboutChannel}>О канале</p>
                </div>
                <div className={m.buttonContainer}>
                    <MyChannelButton buttonText='Настроить вид канала' OnClickHandler={configureChannelHandler} icon='../../../images/settings.png' />
                </div>
            </div>
        </div>
    );
}

export default ChannelHeader;