import { useState } from 'react';
import passPartOfText from '../../../utils/passPartOfText';
import m from './ShowMore.module.css'

function ShowMore({ description, onMoreClick }) {

    const [isDescriptionFull, setIsDescriptionFull] = useState(false);
    const [isDescriptionLong, setIsDescriptionLong] = useState(description?.length > 70 ? true : false);
    const [isDescription, setIsDescription] = useState(description ? true : false);

    const setFullDeacription = () => {
        setIsDescriptionFull(true);
        onMoreClick();
    };

    const setPartialDeacription = () => {
        setIsDescriptionFull(false);
        onMoreClick();
    };

    return (
        <div className={m.block}>
            <p className={m.fieldText}>{isDescription ? isDescriptionFull ?
                description :
                passPartOfText(description, 70) :
                'Нет описания'}</p>
            {isDescriptionLong ? isDescriptionFull ?
                <p className={m.showMore} onClick={setPartialDeacription}>свернуть...</p> :
                <p className={m.showMore} onClick={setFullDeacription}>показать ещё...</p> :
                ''}
        </div>
    );
}

export default ShowMore;