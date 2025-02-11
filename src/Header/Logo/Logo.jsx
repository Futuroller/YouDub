import m from './Logo.module.css'

function Logo() {
    return (
        <>
            <p className={m.title}>YouDub</p>< img src='../../../images/logo.png' className={m.logo} ></img >
        </>
    );
}

export default Logo;