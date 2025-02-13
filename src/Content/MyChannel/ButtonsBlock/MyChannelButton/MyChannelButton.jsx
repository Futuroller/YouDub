import m from './MyChannelButton.module.css'

function MyChannelButton(props) {
    return (
        <button className={m.myChannelButton}>{props.buttonText}</button>
    );
}

export default MyChannelButton;