import m from './DropdownMenuItem.module.css'

function DropdownMenuItem(props) {
    return (
        <div className={m.container} onClick={props.onClickHandler}>
            <img src={props.picture} className={m.itemImage}></img>
            <p className={m.text}>{props.text}</p>
        </div>
    );
}

export default DropdownMenuItem;
