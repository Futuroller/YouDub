import { API_URL_FILES } from '../../../config';
import getTimeline from '../../../utils/getTimeline';
import setWordEnding from '../../../utils/setWordEnding';
import m from './Video.module.css'

function Video(props) {

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>

            <div className={m.underPreview}>
                <img src={props.channelImage ? `${API_URL_FILES}avatars/${props.channelImage}` : '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.videoDescription}>
                    <p className={m.title}>{props.title}</p>
                    <p className={m.channelName}>{props.channelName}</p>
                    <div className={m.stats}>
                        <p>{setWordEnding(props.views, 'просмотр', '', 'а', 'ов')}</p>
                        <p>{getTimeline(props.loadDate)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
