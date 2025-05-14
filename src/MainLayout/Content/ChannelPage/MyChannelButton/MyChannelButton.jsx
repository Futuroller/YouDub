import m from './MyChannelButton.module.css'

function MyChannelButton(props) {
    return (
        <button className={m.myChannelButton} onClick={props.OnClickHandler}>
            {props.icon ? <img src={props.icon} className={m.icon}></img> : ''}
            <span>{props.buttonText}</span>
        </button>
    );
}

export default MyChannelButton;