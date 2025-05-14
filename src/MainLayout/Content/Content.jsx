import MainPage from './MainPage/MainPage';
import ChannelPage from './ChannelPage/ChannelPage';
import ViewHistory from './ViewHistory/ViewHistory'
import PlaylistVideos from './PlaylistVideos/PlaylistVideos'
import EditChannel from './ChannelPage/EditChannel/EditChannel';
import AddVideo from './ChannelPage/AddVideo/AddVideo';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import PlaylistsPage from './PlaylistsPage/PlaylistsPage';
import VideoPage from './VideoPage/VideoPage';
import { useRef } from 'react';
import SubChannelsVideos from './SubChannelsVideos/SubChannelsVideos';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import m from './Content.module.css';
import AddPlaylist from './ChannelPage/AddPlaylist/AddPlaylist';
import EditVideo from './ChannelPage/EditVideo/EditVideo';
import EditPlaylist from './ChannelPage/EditPlaylist/EditPlaylist';

function Content(props) {
    const contentRef = useRef();

    return (
        <div className={m.content} ref={contentRef}>
            <Routes>
                <Route path="/" element={<Navigate to="/main/mainpage" />} />
                <Route path='mainpage/*' element={<MainPage contentRef={contentRef} />} />
                <Route path='search/*' element={<SearchResultsPage contentRef={contentRef} />} />
                <Route path='subscription-videos/*' element={<SubChannelsVideos />} />
                <Route path='channel/*' element={<ChannelPage />} />
                <Route path='my-channel/configure-channel' element={<EditChannel />} />
                <Route path='my-channel/add-video' element={<AddVideo />} />
                <Route path='my-channel/add-playlist' element={<AddPlaylist />} />
                <Route path='history/*' element={<ViewHistory />} />
                <Route path='playlists/' element={<PlaylistsPage />} />
                <Route path='playlists/*' element={<PlaylistVideos />} />
                <Route path='video/*' element={<VideoPage />} />
                <Route path='edit-video/*' element={<EditVideo />} />
                <Route path='edit-playlist/*' element={<EditPlaylist />} />
            </Routes>
        </div>
    );
}

export default Content;