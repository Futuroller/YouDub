import MenuItem from './MenuItem/MenuItem';
import m from './Navbar.module.css'

function Navbar(props) {

    let topMenuItems = props.navbar.topMenu.map(i => (
        <MenuItem title={i.title} picture={i.picture} />
    ));

    let middleMenuItems = props.navbar.middleMenu.map(i => (
        <MenuItem title={i.title} picture={i.picture} />
    ));

    let followChannelsItems = props.navbar.followChannels.map(i => (
        <MenuItem title={i.title} picture={i.picture} />
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
