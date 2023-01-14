import React, { useState, useRef } from 'react';
import './Pages.scss';

import poster from '../assets/poster.jpg';

import Options from '../components/Options';
import Password from '../components/Password';

const Receiver = (props) => {
    const [recording, setRecording] = useState(false);
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);
    const [elapsed, setElapsed] = useState("00:00:00");
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    const videoElement = useRef(null);

    const connect = () => {
        setStatus('Waiting for data!');

        props.socket.on("receive", (args) => {
            if (args.pass === password) {
                console.log(args.data);
                setData(args.data);
            } else {
                setError('Wrong code!')
            }

            setStatus("");
        });

        return () => {
            props.socket.off('receive');
        };
    }

    const startRecording = () => {

    }

    const stopRecording = () => {

    }

    const setVariables = () => {

    }

    const handlePassword = (value) => {
        if (value.length <= 4) {
            setPassword(value);
        }
    }

    return (
        <div className="main_container receiver">
            <h1 className="title">Receiver</h1>

            <Password password={password} handlePassword={handlePassword} connect={connect} />

            {data !== null &&
                <React.Fragment>
                    <Options
                        elapsed={elapsed}
                        recording={recording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                    />

                    <div className="video_container">
                        <video id="video" ref={videoElement} autoPlay playsInline poster={poster} />
                    </div>
                </React.Fragment>
            }

            {error !== "" && <p className="error">{error}</p>}
            {status !== "" && <p className="status">{status}</p>}
        </div>
    );
};

export default Receiver;