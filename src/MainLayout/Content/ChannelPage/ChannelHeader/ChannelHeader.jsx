import { useSelector } from 'react-redux';
import m from './ChannelHeader.module.css'
import { NavLink } from 'react-router-dom';
import { API_URL_FILES } from '../../../../config';
import setWordEnding from '../../../../utils/setWordEnding';
import passPartOfText from '../../../../utils/passPartOfText';
import MyChannelButton from '../MyChannelButton/MyChannelButton';
import SubButton from '../../VideoPage/ChannelInfo/SubButton/SubButton';
import { useState } from 'react';
import AdminBanButton from './AdminBanButton/AdminBanButton';

function ChannelHeader({ channel, onModalOpen }) {
    const user = useSelector((state) => state.user);

    return (
        <div className={m.container}>
            {user.id_role === 2 &&
                user.tagname !== channel.tagname ?
                <AdminBanButton channelName={channel.username}
                    channelTagname={channel.tagname}
                    isBanned={channel.is_banned} banReason={channel.ban_reason} /> : ''}
            <img src={channel.channel_header_url ? `${API_URL_FILES}/headers/${channel.channel_header_url}` : '/images/channelHeader.jpg'} className={m.headerImage}></img>
            <div className={m.subContainer}>
                <img src={channel.avatar_url ?
                    `${API_URL_FILES}/avatars/${channel.avatar_url}` :
                    '../../../../images/userDefault.png'} className={m.channelImage}></img>
                <div className={m.channelInfo}>
                    <p className={m.channelName}>{channel.username}</p>
                    <div className={m.tagAndStat}>
                        <p className={m.tagname}>{channel.tagname}</p>
                        <p>{setWordEnding(channel.subscribersCount, 'подписчик', '', 'а', 'ов')}</p>
                        <p>{setWordEnding(channel.subscriptionsCount, 'подпис', 'ка', 'ки', 'ок')}</p>
                    </div>
                    <p className={m.description}>{passPartOfText(channel.description, 39)}</p>
                    <p className={m.aboutChannel} onClick={onModalOpen}>О канале</p>
                </div>
                <div className={m.buttonContainer}>
                    {channel.tagname === user.tagname ?
                        <NavLink to='/main/my-channel/configure-channel'>
                            <MyChannelButton buttonText='Настройки профиля' icon='../../../images/settings.png' />
                        </NavLink> :
                        <SubButton channelTagname={channel.tagname} isUserFollowed={channel.isFollowed} />}
                </div>
            </div>
        </div>
    );
}

export default ChannelHeader;