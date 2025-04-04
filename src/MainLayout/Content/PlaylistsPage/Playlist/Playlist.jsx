import m from './Playlist.module.css'

function Playlist(props) {
    let displayedStatus = 'Публичный доступ';
    if (props.access_status === 'default playlist' || props.access_status === 'private') {
        displayedStatus = 'Закрытый доступ';
    }

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>
            <div className={m.underPreview}>
                <div className={m.videoDescription}>
                    <div className={m.topBlock}>
                        <p className={m.title}>{props.title}</p>
                        <p>{props.videosCount} видео</p>
                    </div>
                    <div className={m.access}>
                        <p>{displayedStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
