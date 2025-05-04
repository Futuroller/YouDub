import m from './MenuItem.module.css'

function MenuItem(props) {
    return (
        <li className={m.container} onClick={props.onClickHandler}>
            <img src={props.picture} className={m.itemImage}></img>
            <p className={m.title}>{props.title}</p>
        </li>
    );
}

export default MenuItem;