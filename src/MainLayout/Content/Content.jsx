import MainPage from './MainPage/MainPage';
import ChannelPage from './ChannelPage/ChannelPage';
import ViewHistory from './ViewHistory/ViewHistory'
import PlaylistVideos from './PlaylistVideos/PlaylistVideos'
import EditChannel from './ChannelPage/EditChannel/EditChannel';
import AddVideo from './ChannelPage/AddVideo/AddVideo';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import m from './Content.module.css';
import PlaylistsPage from './PlaylistsPage/PlaylistsPage';
import VideoPage from './VideoPage/VideoPage';
import { useRef } from 'react';
import SubChannelsVideos from './SubChannelsVideos/SubChannelsVideos';

function Content(props) {
    const contentRef = useRef();

    return (
        <div className={m.content} ref={contentRef}>
            <Routes>
                <Route path="/" element={<Navigate to="/main/mainpage" />} />
                <Route path='mainpage/*' element={<MainPage contentRef={contentRef} />} />
                <Route path='subscription-videos/*' element={<SubChannelsVideos />} />
                <Route path='channel/*' element={<ChannelPage />} />
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