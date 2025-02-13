import m from './ButtonsBlock.module.css'
import MyChannelButton from './MyChannelButton/MyChannelButton';

function ButtonsBlock() {
    return (
        <div className={m.container}>
            <MyChannelButton buttonText='Главная' />
            <MyChannelButton buttonText='Видео' />
            <MyChannelButton buttonText='Плейлисты' />
        </div>
    );
}

export default ButtonsBlock;