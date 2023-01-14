import React, { useState, useRef } from 'react';
import UTIL from './utilities';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(null);
  const [elapsed, setElapsed] = useState("00:00:00");
  const [source, setSource] = useState(null);
  const videoElement = useRef(null);

  const startRecording = () => {
    /*setRecording(true);

    let startTime = new Date();

    capture();

    setTimer(setInterval(() => {
      setElapsed(UTIL.getElapsedTime(startTime));
    }, 1000));*/

    try {
      startCapture();
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  const stopRecording = () => {
    /*setRecording(false);

    setElapsed("00:00:00");

    clearInterval(timer);*/

    let tracks = source.getTracks();

    tracks.forEach((track) => track.stop());
    setSource(null);
  }

  const capture = () => {
    startCapture().then(res => {
      console.log(res);
    });
  }

  const startCapture = async () => {
    let captureStream = null;

    let displayMediaOptions = {
      video: {
        displaySurface: "window"
      },
      audio: false
    }

    try {
      setSource(await navigator.mediaDevices.getDisplayMedia(displayMediaOptions));

      console.log(source);
    } catch (err) {
      console.error(`Error: ${err}`);
    }

    return captureStream;
  }

  return (
    <React.Fragment>
      <div className="container">
        {/* Options */}
        <div className="options">
          <button className="start" disabled={recording} onClick={startRecording}>Start</button>
          <button className="stop" disabled={recording} onClick={stopRecording}>Stop</button>
          <span className="elapsed">{elapsed}</span>
        </div>

        <div className="result">
          <video id="video" src={source} ref={videoElement} autoPlay controls />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;