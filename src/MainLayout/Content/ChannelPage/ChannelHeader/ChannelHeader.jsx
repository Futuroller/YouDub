import { useSelector } from 'react-redux';
import m from './ChannelHeader.module.css'
import { useNavigate } from 'react-router-dom';
import { API_URL_FILES } from '../../../../config';
import setWordEnding from '../../../../utils/setWordEnding';
import passPartOfText from '../../../../utils/passPartOfText';
import MyChannelButton from '../MyChannelButton/MyChannelButton';
import SubButton from '../../VideoPage/ChannelInfo/SubButton/SubButton';

function ChannelHeader({ channel }) {
    const user = useSelector((state) => state.user);
    const navigator = useNavigate();

    const configureChannelHandler = () => {
        navigator('configure-channel');
    };

    return (
        <div className={m.container}>
            <img src={channel.channel_header_url ? `${API_URL_FILES}/headers/${channel.channel_header_url}` : '/images/channelHeader.jpg'} className={m.headerImage}></img>
            <div className={m.subContainer}>
                <img src={channel.avatar_url ? `${API_URL_FILES}/avatars/${channel.avatar_url}` : '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.channelInfo}>
                    <p className={m.channelName}>{channel.username}</p>
                    <div className={m.tagAndStat}>
                        <p>{setWordEnding(channel.subscribersCount, 'подписчик', '', 'а', 'ов')}</p>
                        <p>{setWordEnding(channel.subscriptionsCount, 'подпис', 'ка', 'ки', 'ок')}</p>
                    </div>
                    <p className={m.description}>{passPartOfText(channel.description, 39)}</p>
                    <p className={m.aboutChannel}>О канале</p>
                </div>
                <div className={m.buttonContainer}>
                    {channel.tagname === user.tagname ?
                        <MyChannelButton buttonText='Настроить вид канала' OnClickHandler={configureChannelHandler} icon='../../../images/settings.png' /> :
                        <SubButton channelTagname={channel.tagname} isUserFollowed={channel.isFollowed} />}
                </div>
            </div>
        </div>
    );
}

export default ChannelHeader;