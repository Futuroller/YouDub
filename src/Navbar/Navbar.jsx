import MenuItem from './MenuItem/MenuItem';
import m from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

function Navbar(props) {

    let topMenuItems = props.navbar.topMenu.map(i => (
        <NavLink to={i.navigation}> <MenuItem title={i.title} picture={i.picture} /></NavLink>
    ));

    let middleMenuItems = props.navbar.middleMenu.map(i => (
        <NavLink to={i.navigation}> <MenuItem title={i.title} picture={i.picture} /></NavLink>
    ));

    let followChannelsItems = props.navbar.followChannels.map(i => (
        <NavLink to={i.navigation}> <MenuItem title={i.title} picture={i.picture} /></NavLink>
    ));


    return (
        <div className={m.nav}>
            <ol>
                {topMenuItems}
            </ol>
            <div className={m.line}></div>
            <ol>
                {middleMenuItems}
            </ol>
            <div className={m.line}></div>
            <ol>
                {followChannelsItems}
            </ol>
        </div>
    );
}

export default Navbar;
