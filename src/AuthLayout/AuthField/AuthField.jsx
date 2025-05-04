import m from './AuthField.module.css'

function AuthField(props) {

    return (
        <div className={m.container}>
            <p>{props.fieldTitle}</p>
            <input
                className={m.textfield}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                maxLength={props.maxLength}
                required
            />
        </div>
    );
}

export default AuthField;