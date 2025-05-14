import m from './PreloadPlaylist.module.css'

function PreloadPlaylist(props) {
    let displayedStatus = 'Публичный доступ';
    if (props.access_status === 2 || props.access_status === 3) {
        displayedStatus = 'Закрытый доступ';
    }

    return (
        <div className={m.container}>
            <div className={m.previewContainer}>
                <img src={props.preview} className={m.preview}></img>
            </div>
            <div className={m.underPreview}>
                <div className={m.videoDescription}>
                    <div className={m.topBlock}>
                        <p className={m.title}>{props.title}</p>
                        <p className={m.videosCount}>{props.videosCount} видео</p>
                    </div>
                    <div className={m.access}>
                        <p>{displayedStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreloadPlaylist;
