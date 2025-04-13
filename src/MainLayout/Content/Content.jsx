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
import VideoPage from './VideoPage/VideoPage';

function Content(props) {
    return (
        <div className={m.content}>
            <Routes>
                <Route path="/" element={<Navigate to="/main/mainpage" />} />
                <Route path='mainpage/*' element={<MainPage />} />
                <Route path='subscription-videos/*' element={<PlaylistVideos title='Новое' />} />
                <Route path='my-channel/*' element={<MyChannel />} />
                <Route path='my-channel/configure-channel' element={<EditChannel />} />
                <Route path='my-channel/add-video' element={<AddVideo />} />
                <Route path='history/*' element={<ViewHistory />} />
                <Route path='playlists/' element={<PlaylistsPage />} />
                <Route path='playlists/*' element={<PlaylistVideos />} />
                <Route path='video/*' element={<VideoPage />} />
            </Routes>
        </div>
    );
}

export default Content;