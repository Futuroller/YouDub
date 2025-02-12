import ChannelHeader from './ChannelHeader/ChannelHeader';
import m from './MyChannel.module.css'

function MyChannel(props) {
    return (
        <div className={m.container}>
            <ChannelHeader />
        </div>
    );
}

export default MyChannel;