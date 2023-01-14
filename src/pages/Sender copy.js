import React, { useState, useRef } from 'react';

const Sender = () => {
    const [playing, setPlaying] = useState(false);
    const [stream, setStream] = useState(null);
    const videoElement = useRef(null);

    const startRecording = async () => {
        let newStream = await navigator.mediaDevices
            .getDisplayMedia({
                video: {
                    displaySurface: "window"
                },
                audio: false
            })
            .then((newStream) => {
                videoElement.current.srcObject = newStream;
                setStream(newStream);
            });

        setPlaying(true);
    }

    const stopRecording = () => {
        stream.getTracks().forEach((track) => track.stop());

        setPlaying(false);
    }

    return (
        <React.Fragment>
            <div className="container">
                {/* Options */}
                <div className="options">
                    <button className="start" disabled={playing} onClick={startRecording}>Start</button>
                    <button className="stop" disabled={!playing} onClick={stopRecording}>Stop</button>
                </div>

                <div className="result">
                    <video id="video" ref={videoElement} autoPlay playsInline />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sender;