import MainPage from './MainPage/MainPage';
import MyChannel from './MyChannel/MyChannel';
import ViewHistory from './ViewHistory/ViewHistory'
import PlaylistVideos from './PlaylistVideos/PlaylistVideos'
import EditChannel from './MyChannel/EditChannel/EditChannel';
import AddVideo from './MyChannel/AddVideo/AddVideo';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import m from './Content.module.css';
import PlaylistsPage from './PlaylistsPage/PlaylistsPage';

function Content(props) {
    return (
        <div className={m.content}>
            <Routes>
                <Route path="/" element={<Navigate to="/main/mainpage" />} />
                <Route path='mainpage/*' element={<MainPage />} />
                <Route path='subscription-videos/*' element={<PlaylistVideos content={props.content} title='Новое' />} />
                <Route path='my-channel/*' element={<MyChannel content={props.content} />} />
                <Route path='my-channel/configure-channel' element={<EditChannel content={props.content} />} />
                <Route path='my-channel/add-video' element={<AddVideo content={props.content} />} />
                <Route path='history/*' element={<ViewHistory content={props.content} />} />
                <Route path='playlists/' element={<PlaylistsPage content={props.content} />} />
                <Route path='playlists/*' element={<PlaylistVideos content={props.content} />} />
            </Routes>
        </div>
    );
}

export default Content;