import { useState } from 'react';
import passPartOfText from '../../../../utils/passPartOfText';
import setWordEnding from '../../../../utils/setWordEnding';
import m from './ChannelModal.module.css'

function ChannelModal({ channel, onCloseClick }) {
    const date = new Date(channel.registration_date);

    const formatted = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const [isDescriptionFull, setIsDescriptionFull] = useState(false);
    const [isDescriptionLong, setIsDescriptionLong] = useState(channel.description?.length > 70 ? true : false);
    const [isDescription, setIsDescription] = useState(channel.description ? true : false);

    return (
        <div className={m.overlay} onClick={onCloseClick}>
            <div className={m.container} style={{ width: isDescriptionFull ? '500px' : '400px' }}
                onClick={(e) => e.stopPropagation()}>
                <div className={m.topSide}>
                    <h2 className={m.title}>{channel.username}</h2>
                    <button className={m.deleteButton} onClick={onCloseClick}></button>
                </div>
                <div className={m.block}>
                    <h2>Описание</h2>
                    <p className={m.fieldText}>{isDescription ? isDescriptionFull ?
                        channel.description :
                        passPartOfText(channel.description, 70) :
                        <p className={m.fieldText}>Нет описания</p>}</p>
                    {isDescriptionLong ? isDescriptionFull ?
                        <p className={m.showMore} onClick={() => setIsDescriptionFull(false)}>свернуть...</p> :
                        <p className={m.showMore} onClick={() => setIsDescriptionFull(true)}>показать ещё...</p> :
                        ''}
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