import React from 'react';

const Options = (props) => {
    return (
        <div className={["options_container", props.sender ? null : "receiver"].join(' ')}>
            <button className="start" disabled={props.recording} onClick={props.startRecording}>Start</button>
            <button className="stop" disabled={!props.recording} onClick={props.stopRecording}>Stop</button>
            {props.sender && <button onClick={() => props.setMobile(true)}>Receiver</button>}
            <span className="elapsed">{props.elapsed}</span>
        </div>
    );
};

export default Options; 