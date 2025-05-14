import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import m from './ChannelsSlider.module.css'
import { API_URL_FILES } from '../../../../config';

const ChannelSlider = ({ channels }) => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className={m.sliderWrapper}>
            <div className={m.arrow} onClick={scrollLeft}>
                ❮
            </div>
            <div className={m.channelSlider} ref={sliderRef}>
                {channels.map(channel => (
                    <NavLink
                        className={m.channel}
                        to={`/main/channel/${channel.tagname}`}
                        key={channel.id}
                    >
                        <img
                            src={channel.avatar_url
                                ? `${API_URL_FILES}/avatars/${channel.avatar_url}`
                                : '../../../images/userDefault.png'}
                            className={m.channelImage}
                            alt={channel.username}
                        />
                        <p className={m.channelTitle}>{channel.username}</p>
                    </NavLink>
                ))}
            </div>
            <div className={m.arrow} onClick={scrollRight}>
                ❯
            </div>
        </div>
    );
};

export default ChannelSlider;
