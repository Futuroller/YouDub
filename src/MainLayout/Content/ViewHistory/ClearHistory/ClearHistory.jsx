import MenuItem from '../../../MenuItem/MenuItem';
import m from './ClearHistory.module.css'
import apiRequest from '../../../../api/apiRequest';
import { useDispatch } from 'react-redux';
import { clearHistoryVideos } from '../../../../store/slices/videosSlice';

function ClearHistory(props) {
    const dispatch = useDispatch();

    const onDeleteHistory = async () => {
        const answer = confirm('Вы уверены что хотите очистить историю?');
        if (!answer) return;
        const response = await apiRequest('/main/history', 'DELETE');
        if (response.status !== 200) {
            alert('Ошибка удаления истории просмотра');
            return;
        }
        dispatch(clearHistoryVideos());
    };

    let sideMenuItems = props.sideMenu.map(i => (
        <MenuItem key={i.id} picture={i.picture} title={i.title} to={i.navigation} onClickHandler={onDeleteHistory} />
    ));

    return (
        <div className={m.menuItems}>
            {sideMenuItems}
        </div>
    );
}

export default ClearHistory;