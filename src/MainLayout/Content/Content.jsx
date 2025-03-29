import MainPage from './MainPage/MainPage';
import MyChannel from './MyChannel/MyChannel';
import ViewHistory from './ViewHistory/ViewHistory'
import AnyVideos from './AnyVideos/AnyVideos'
import EditChannel from './MyChannel/EditChannel/EditChannel';
import { Routes, Route } from 'react-router-dom';
import m from './Content.module.css';
import PlaylistsPage from './PlaylistsPage/PlaylistsPage';

function Content(props) {
    return (
        <div className={m.content}>
            <Routes>
                <Route path='mainpage/*' element={<MainPage />} />
                <Route path='subscription-videos/*' element={<AnyVideos content={props.content} title='Новое' />} />
                <Route path='watch-later/*' element={<AnyVideos content={props.content} title='Смотреть позже' />} />
                <Route path='liked/*' element={<AnyVideos content={props.content} title='Понравившиеся' />} />
                <Route path='my-channel/*' element={<MyChannel content={props.content} />} />
                <Route path='my-channel/configure-channel' element={<EditChannel content={props.content} />} />
                <Route path='history/*' element={<ViewHistory content={props.content} />} />
                <Route path='playlists/*' element={<PlaylistsPage content={props.content} />} />
            </Routes>
        </div>
    );
}

export default Content;