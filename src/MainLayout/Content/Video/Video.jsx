import { API_URL_FILES } from '../../../config';
import getTimeline from '../../../utils/getTimeline';
import setWordEnding from '../../../utils/setWordEnding';
import passPartOfText from '../../../utils/passPartOfText';
import getMeasurementUnit from '../../../utils/getMeasurementUnit';
import m from './Video.module.css'
import { NavLink, useNavigate } from 'react-router-dom';

function Video(props) {
    const navigate = useNavigate();

    let description = props.description ? `◆ ${props.description}` : '';

    const goToVideo = () => {
        navigate(`/main/video/${props.url}`)
    };

    return (
        <NavLink key={props.id} to={`/main/video/${props.url}`} className={m.container}>
            <img src={props.preview} className={m.preview}></img>
            <div className={m.underPreview}>
                <img src={props.channelImage ? `${API_URL_FILES}avatars/${props.channelImage}` : '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.videoDescription}>
                    <p className={m.title}>{passPartOfText(props.title, 22)}</p>
                    <div className={m.nameAndDescription}>
                        <p className={m.channelName}>{props.channelName}</p>
                        <p className={m.channelName}>{passPartOfText(description, 25)}</p>
                    </div>
                    <div className={m.stats}>
                        <p>{setWordEnding(getMeasurementUnit(props.views), 'просмотр', '', 'а', 'ов')}</p>
                        <p>{getTimeline(props.loadDate)}</p>
                    </div>
                </div>
            </div>
        </NavLink >
    );
}

export default Video;
