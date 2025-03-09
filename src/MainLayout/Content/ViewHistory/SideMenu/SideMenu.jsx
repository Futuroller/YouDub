import MenuItem from '../../../MenuItem/MenuItem';
import Search from '../../../Search/Search';
import { NavLink } from 'react-router-dom';
import m from './SideMenu.module.css'

function SideMenu(props) {


    let sideMenuItems = props.sideMenu.map(i => (
        <NavLink key={i.id} to={i.navigation}> <MenuItem picture={i.picture} title={i.title} to={i.navigation} /> </NavLink>
    ));

    return (
        <div className={m.container}>
            <Search className={m.searchBar} />
            <div className={m.menuItems}>
                {sideMenuItems}
            </div>
        </div>
    );
}

export default SideMenu;