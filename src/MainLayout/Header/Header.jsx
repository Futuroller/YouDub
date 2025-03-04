import Search from '../Search/Search';
import Channel from './Channel/Channel';
import m from './Header.module.css'
import HideNavButton from './HideNavButton/HideNavButton';
import Logo from './Logo/Logo';

function Header() {
    return (
        <div className={m.header}>
            <HideNavButton />
            <Logo />
            <Search />
            <Channel />
        </div>
    );
}

export default Header;
