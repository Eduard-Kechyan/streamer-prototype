import React, { useState, useRef } from 'react';
import UTIL from '../utilities';
import './Pages.scss';

import Options from '../components/Options';
import Password from '../components/Password';

const Sender = (props) => {
    const [recording, setRecording] = useState(false);
    const [password, setPassword] = useState('0000');
    const [stream, setStream] = useState(null);
    const [timer, setTimer] = useState(null);
    const [elapsed, setElapsed] = useState("00:00:00");

    const startRecording = async () => {
        props.socket.emit("send", "Finaly?");

        /*let newStream = await navigator.mediaDevices
            .getDisplayMedia({
                video: {
                    displaySurface: "window"
                },
                audio: false
            })
            .then((newStream) => {
                videoElement.current.srcObject = newStream;


                axios
                    .get("/send/" + newStream)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                setStream(newStream);
            });*/

        startTimer();
    }

    const stopRecording = () => {
        //stream.getTracks().forEach((track) => track.stop());

        stopTimer();
    }

    const startTimer = () => {
        setRecording(true);

        let startTime = new Date();

        setTimer(setInterval(() => {
            setElapsed(UTIL.getElapsedTime(startTime));
        }, 1000));
    }

    const stopTimer = () => {
        setRecording(false);

        setElapsed("00:00:00");

        clearInterval(timer);
    }

    const generatePassword = () => {
        let generatedPass = '';

        for (let i = 0; i < 4; i++) {
            generatedPass = generatedPass += Math.floor(Math.random() * 9) + 1;
        }

        props.socket.emit("setPass", generatedPass);

        setPassword(generatedPass);
    }

    return (
        <div className="main_container">
            <h1 className="title">Sender</h1>

            <Password sender password={password} generatePassword={generatePassword} />

            <Options
                sender
                elapsed={elapsed}
                recording={recording}
                setMobile={props.setMobile}
                startRecording={startRecording}
                stopRecording={stopRecording}
            />
        </div>
    );
};

export default Sender;