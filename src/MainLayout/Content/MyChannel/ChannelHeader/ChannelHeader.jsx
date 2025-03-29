import { useSelector } from 'react-redux';
import m from './ChannelHeader.module.css'
import { useNavigate } from 'react-router-dom';
import { API_URL_FILES } from '../../../../config';

function ChannelHeader(props) {
    const user = useSelector((state) => state.user);
    const navigator = useNavigate();

    const configureChannelHandler = () => {
        navigator('configure-channel');
    };


    const passPartOfText = (text) => {
        if (!text) return;
        text = text.length < 40 ? text : text.slice(0, 39) + '...';
        return text;
    };

    const setWordEnding = (num, word, ending1, ending2_4, ending0_5_9) => {
        num = num < 100 ? num : num % 100;
        if (num < 10 || num > 20) {
            num %= 10;
            if (num == 1) {
                word += ending1;
            } else if (num >= 2 && num <= 4) {
                word += ending2_4;
            } else if (num == 0 || (num >= 5 && num <= 9)) {
                word += ending0_5_9;
            }
        } else {
            word += ending0_5_9;
        }
        return num + ' ' + word;
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
                        <p>{setWordEnding(user.subscriptionsCount, 'подпис', 'ка', 'ки', 'сок')}</p>
                    </div>
                    <p className={m.description}>{passPartOfText(user.description)}</p>
                    <p className={m.aboutChannel}>О канале</p>
                </div>
                <div className={m.buttonContainer}>
                    <button onClick={configureChannelHandler}>Настроить вид канала</button>
                </div>
            </div>
        </div>
    );
}

export default ChannelHeader;