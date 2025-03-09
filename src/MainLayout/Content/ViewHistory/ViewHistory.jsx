import WideVideo from '../WideVideo/WideVideo';
import SideMenu from './SideMenu/SideMenu';
import { useState } from 'react';
import m from './ViewHistory.module.css'

function ViewHistory(props) {

    const [sideMenu, setSideMenu] = useState([
        { id: 1, title: 'Очистить историю просмотра', picture: '../images/basket.png' },
        { id: 2, title: 'Не сохранять историю просмотра', picture: '../images/pause.png' }
    ]);

    let videosList = props.content.videos.map(v => (
        <WideVideo key={v.id} title={v.title} channelName={v.channelName} preview={v.preview} channelImage={v.channelImage} />
    ));

    return (
        <div className={m.container}>
            <p className={m.title}>История просмотра</p>
            <p className={m.subtitle}>Сегодня</p>
            <div className={m.content}>
                <div className={m.videos}>
                    {videosList}
                </div>
                <SideMenu sideMenu={sideMenu} />
            </div>
        </div>
    );
}

export default ViewHistory;