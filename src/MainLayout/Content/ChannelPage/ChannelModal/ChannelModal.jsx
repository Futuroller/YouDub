import { useState } from 'react';
import setWordEnding from '../../../../utils/setWordEnding';
import m from './ChannelModal.module.css'
import ShowMore from '../../ShowMore/ShowMore';

function ChannelModal({ channel, onCloseClick }) {
    const date = new Date(channel.registration_date);

    const formatted = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const [isFull, setIsFull] = useState(false);

    return (
        <div className={m.overlay} onClick={onCloseClick}>
            <div className={m.container} style={{ width: isFull ? '500px' : '400px' }}
                onClick={(e) => e.stopPropagation()}>
                <div className={m.topSide}>
                    <h2 className={m.title}>{channel.username}</h2>
                    <button className={m.deleteButton} onClick={onCloseClick}></button>
                </div>
                <div className={m.block}>
                    <h2>Описание</h2>
                    <ShowMore description={channel.description} onMoreClick={() => setIsFull(!isFull)} />
                </div>
                <div className={m.block}>
                    <h2>Информация</h2>
                    <p className={m.fieldText}>Дата регистрации: {formatted}</p>
                    <p className={m.fieldText}>{setWordEnding(channel.subscribersCount, 'подписчик', '', 'а', 'ов')}</p>
                    <p className={m.fieldText}>{setWordEnding(channel.subscriptionsCount, 'подпис', 'ка', 'ки', 'ок')}</p>
                </div>
            </div>
        </div>
    );
}

export default ChannelModal;