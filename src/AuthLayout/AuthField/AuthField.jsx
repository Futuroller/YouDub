import m from './AuthField.module.css'

function AuthField(props) {

    return (
        <div className={m.container}>
            <p>{props.fieldTitle}</p>
            <input type={props.type} placeholder={props.placeholder} className={m.textfield}></input>
        </div>
    );
}

export default AuthField;