import MainPage from './MainPage/MainPage';
import MyChannel from './MyChannel/MyChannel';
import ViewHistory from './ViewHistory/ViewHistory'
import { Routes, Route } from 'react-router-dom';
import m from './Content.module.css';

function Content(props) {
    return (
        <div className={m.content}>
            <Routes>
                <Route path='/mainpage/*' element={<MainPage content={props.content} />} />
                <Route path='/mychannel/*' element={<MyChannel content={props.content} />} />
                <Route path='/viewhistory/*' element={<ViewHistory content={props.content} />} />
            </Routes>
        </div>
    );
}

export default Content;