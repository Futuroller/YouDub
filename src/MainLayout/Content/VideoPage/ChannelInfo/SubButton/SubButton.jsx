import { useDispatch } from 'react-redux';
import apiRequest from '../../../../../api/apiRequest';
import m from './SubButton.module.css'
import { clearChannels, fetchSubscribedChannels } from '../../../../../store/slices/channelsSlice';
import { useState } from 'react';

function SubButton({ channelTagname, isUserFollowed }) {
    const dispatch = useDispatch();
    const [isFollowed, setIsFollowed] = useState(isUserFollowed ? isUserFollowed : false);

    const onSubClick = async () => {
        if (isFollowed) {
            const response = await apiRequest(`/main/channels/subscription/${channelTagname}`, 'DELETE')
            if (response.status !== 200) return alert('Ошибка отписки');
            dispatch(clearChannels());
            dispatch(fetchSubscribedChannels());
            setIsFollowed(false);
        } else {
            const response = await apiRequest(`/main/channels/subscription/${channelTagname}`, 'POST')
            if (response.status !== 200) return alert('Ошибка подписки');
            dispatch(clearChannels());
            dispatch(fetchSubscribedChannels());
            setIsFollowed(true);
        }
    };

    return (
        <button className={m.subButton} onClick={onSubClick}>
            <img src={isFollowed ?
                '../../../../images/unfollow.png' :
                '../../../../images/follow.png'} />
            {isFollowed ?
                <span>Отписаться</span> :
                <span>Подписаться</span>}
        </button>
    );
}

export default SubButton;