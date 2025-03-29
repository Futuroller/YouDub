import DropdownMenuItem from "./DropdownMenuItem/DropdownMenuItem";
import m from './DropdownMenu.module.css'

function DropdownMenu(props) {
    let menuItemsList = props.menuItems.map(i => (
        <DropdownMenuItem key={i.id} text={i.text} onClickHandler={i.onClickHandler} picture={i.picture} />
    ));

    return (
        <div className={m.container} style={{ top: props.top, left: props.left }}>
            {menuItemsList}
        </div>
    );
}

export default DropdownMenu;
