import m from './Content.module.css'
import MainPage from './MainPage/MainPage';

function Content(props) {   
    return (
        <div className={m.content}>
            <MainPage content={props.content}/>
        </div>
    );
}

export default Content;