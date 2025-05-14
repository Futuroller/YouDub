import { useDispatch, useSelector } from 'react-redux';
import m from './AdminBanButton.module.css'
import apiRequest from '../../../../../api/apiRequest';
import { fetchChannelByTagname } from '../../../../../store/slices/channelsSlice';

function AdminBanButton({ channelName, channelTagname, isBanned, banReason }) {
    const dispatch = useDispatch();

    const onBanUser = async () => {
        const promptTagname = prompt('Для подтверждения блокировки, введите название данного канала');
        if (!promptTagname) return;
        if (promptTagname !== channelName) {
            alert('Неверное название канала');
            return;
        }
        const promptBanReason = prompt('Укажите причину блокировки', 'Причина не указана');
        if (!promptBanReason) return;

        try {
            const response = await apiRequest(`/main/user/ban/${channelTagname}`, 'PATCH', { banReason: promptBanReason });

            if (response.status === 200) {
                alert(`Пользователь ${channelName} заблокирован`);
                dispatch(fetchChannelByTagname(channelTagname));
            } else {
                alert('Ошибка блокировки пользователя');
            }
        } catch (error) {
            alert(`Ошибка отправки запроса`);
            console.error(error);
        }
    };

    const onUnbanUser = async () => {
        try {
            const answer = confirm(`Вы уверены что хотите разблокировать пользователя?` +
                `Пользователь заблокирован по причине: ${banReason}`);
            if (!answer) return;
            const response = await apiRequest(`/main/user/unban/${channelTagname}`, 'PATCH');

            if (response.status === 200) {
                alert(`Пользователь ${channelName} разблокирован`);
                dispatch(fetchChannelByTagname(channelTagname));
            } else {
                alert('Ошибка разблокировки пользователя');
            }
        } catch (error) {
            alert(`Ошибка отправки запроса`);
            console.error(error);
        }
    };

    return (
        <div className={m.container}>
            {isBanned ?
                <img src={'../../../../../images/unban.png'} onClick={onUnbanUser} title='Разблокировать пользователя'></img> :
                <img src={'../../../../../images/ban.png'} onClick={onBanUser} title='Заблокировать пользователя'></img>}
        </div>
    );
}

export default AdminBanButton;