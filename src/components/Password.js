import React, { useState } from 'react';

const Password = (props) => {
    const [pasted, setPasted] = useState(false);

    const copyPassword = () => {
        navigator.clipboard.writeText(props.password);
    }

    const pastePassword = () => {
        navigator.clipboard.readText().then((clipText) => {
            props.handlePassword(clipText);
            setPasted(true);
            props.connect();
        })
    }

    const handleText = (value) => {
        props.handlePassword(value);

        setPasted(false);
    }

    return (
        <div className={["password_container", props.sender ? null : "receiver"].join(' ')}>
            {props.sender ?
                <React.Fragment>
                    <button onClick={props.generatePassword}>Generate</button>
                    {props.password !== "0000" && <button onClick={copyPassword}>Copy</button>}
                    <span className="password">{props.password}</span>
                </React.Fragment>
                :
                <React.Fragment>
                    <button onClick={pastePassword}>Paste</button>
                    <input type="text" value={props.password} onChange={event => handleText(event.target.value)} />
                    {props.password.length === 4 && !pasted && <button className="connect" onClick={props.connect}>Wait</button>}
                </React.Fragment>
            }
        </div>
    );
};

export default Password;