import m from './MyChannelButton.module.css'

function MyChannelButton(props) {
    return (
        <button className={m.myChannelButton} onClick={props.OnClickHandler}>{props.buttonText}</button>
    );
}

export default MyChannelButton;