import m from './Channel.module.css'

function Channel() {
    return (
        <div className={m.container}>
            <img src='https://resizer.mail.ru/p/d17e4854-1df3-5d27-b071-09678bd0e06c/AQAKAVJLQIl91R5zH8OEr1xUGlL71hc9DsI7D0HshRtrjcijaOQQc-XEG9kHQY6vRHy6aOdcD_f4AvBQhjKEhFRZxRA.webp' className={m.channelImage}></img>
            <p className={m.channelTitle}>=Канал добра и позитива=</p>
        </div>
    );
}

export default Channel;