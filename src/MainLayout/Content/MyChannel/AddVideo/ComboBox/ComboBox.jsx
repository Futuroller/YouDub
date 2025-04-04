import m from './ComboBox.module.css';

function ComboBox(props) {
    return (
        <div className={m.container}>
            <p className={m.title}>{props.title}</p>
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
            </select>
        </div>
    );
}

export default ComboBox;