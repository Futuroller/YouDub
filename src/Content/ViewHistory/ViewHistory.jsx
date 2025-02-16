import WideVideo from '../WideVideo/WideVideo';
import SideMenu from './SideMenu/SideMenu';
import m from './ViewHistory.module.css'

function ViewHistory(props) {

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
                <SideMenu sideMenu={props.menuItems.sideMenu} />
            </div>
        </div>
    );
}

export default ViewHistory;