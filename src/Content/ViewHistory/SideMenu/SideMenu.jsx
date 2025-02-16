import MenuItem from '../../../MenuItem/MenuItem';
import Search from '../../../Search/Search';
import m from './SideMenu.module.css'

function SideMenu(props) {

    let sideMenuItemsList = props.sideMenu.map(i => (
        <MenuItem picture={i.picture} title={i.title} />
    ));

    return (
        <div className={m.container}>
            <Search className={m.searchBar} />
            <div className={m.menuItems}>
                {sideMenuItemsList}
            </div>
        </div>
    );
}

export default SideMenu;