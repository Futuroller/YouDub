import getTimeline from '../../../../utils/getTimeline';
import setWordEnding from '../../../../utils/setWordEnding';
import passPartOfText from '../../../../utils/passPartOfText';
import getMeasurementUnit from '../../../../utils/getMeasurementUnit';
import m from './PreloadVideo.module.css'
import { API_URL_FILES } from '../../../../config';

function PreloadVideo(props) {
    let description = props.description ? `◆ ${props.description}` : '';

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>
            <div className={m.underPreview}>
                <img src={props.channelImage ? `${API_URL_FILES}avatars/${props.channelImage}` : '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.videoDescription}>
                    <p className={m.title}>{props.title}</p>
                    <div className={m.nameAndDescription}>
                        <p className={m.channelName}>{props.channelName}</p>
                        <p className={m.channelDescription}>{description}</p>
                    </div>
                    <div className={m.stats}>
                        <p>{setWordEnding(getMeasurementUnit(props.views), 'просмотр', '', 'а', 'ов')}</p>
                        <p>{getTimeline(props.loadDate)}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PreloadVideo;
