import { API_URL_FILES } from '../../../config';
import getTimeline from '../../../utils/getTimeline';
import setWordEnding from '../../../utils/setWordEnding';
import getMeasurementUnit from '../../../utils/getMeasurementUnit';
import m from './Video.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import apiRequest from '../../../api/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistoryVideos, fetchHistory } from '../../../store/slices/videosSlice';
import { useState } from 'react';
import AdminRemoveVideoButton from './AdminRemoveVideoButton/AdminRemoveVideoButton';

function Video(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const isCollapsed = useSelector(state => state.ui.isNavbarCollapsed);
    const user = useSelector(state => state.user)
    let description = props.description ? `◆ ${props.description}` : '';
    const onVideoClick = async () => {
        const response = await apiRequest(`/main/history/${props.url}`, 'POST');

        if (response.status !== 200) {
            return;
        } else {
            dispatch(clearHistoryVideos());
            dispatch(fetchHistory({ page, limit: 10 }));
        }
    };

    const onVideoEdit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/main/edit-video/${props.url}`);
    };

    return (
        <NavLink key={props.id} to={`/main/video/${props.url}`} className={`${m.container} ${isCollapsed ? m.expanded : m.narrow}`} onClick={onVideoClick}>
            {props.idUserRole === 2 || props.isUserOwner ? <AdminRemoveVideoButton videoName={props.title} videoUrl={props.url} /> : ''}
            <img src={props.preview} className={m.preview}></img>
            <div className={m.progressBar} style={{ width: `${props.progressPercent}%` }} />
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
                    {props.canEdit ? <img src='../../../../images/edit.png' className={m.editButton} onClick={onVideoEdit}></img> : ''}
                </div>
            </div>
        </NavLink >
    );
}

export default Video;
