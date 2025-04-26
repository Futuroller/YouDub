import m from './ComboBox.module.css';

function ComboBox(props) {
    return (
        <div className={m.container}>
            <p className={m.title}>{props.title}</p>
            <select onChange={(e) => props.onChange(props.options.find(opt => opt.id == e.target.value))}>
                <option value="" >-- Выберите --</option>
                {props.options.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ComboBox;