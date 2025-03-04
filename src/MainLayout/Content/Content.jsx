import MainPage from './MainPage/MainPage';
import MyChannel from './MyChannel/MyChannel';
import ViewHistory from './ViewHistory/ViewHistory'
import SubscriptionVideos from './SubscriptionVideos/SubscriptionVideos'
import { Routes, Route } from 'react-router-dom';
import m from './Content.module.css';

function Content(props) {
    return (
        <div className={m.content}>
            <Routes>
                <Route path='mainpage/*' element={<MainPage content={props.content} />} />
                <Route path='subscription-videos/*' element={<SubscriptionVideos content={props.content} />} />
                <Route path='my-channel/*' element={<MyChannel content={props.content} />} />
                <Route path='history/*' element={<ViewHistory content={props.content} menuItems={props.menuItems} />} />
            </Routes>
        </div>
    );
}

export default Content;