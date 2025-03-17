import m from './Playlist.module.css'

function Playlist(props) {

    return (
        <div className={m.container}>
            <img src={props.preview} className={m.preview}></img>
            <div className={m.underPreview}>
                <div className={m.videoDescription}>
                    <div className={m.topBlock}>
                        <p className={m.title}>{props.title}</p>
                        <p>5000 видео</p>
                    </div>
                    <div className={m.access}>
                        <p>Доступ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
