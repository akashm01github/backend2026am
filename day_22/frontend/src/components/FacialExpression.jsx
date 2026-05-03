import * as faceapi from 'face-api.js';
import { useRef, useState } from 'react';
import axios from 'axios';
import './FacialExpression.scss';

const FacialExpression = ({ setSongs }) => {

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [isRunning, setisRunning] = useState(false);

  //! LOAD MODELS
  const loadModels = async () => {
    const URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(URL),
      faceapi.nets.faceExpressionNet.loadFromUri(URL),
    ]);
    console.log('Models Loaded✅');
  };

  //! START THE CAMERA
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  //! FACE DETECTION
  const detectExpression = () => {
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      if (detection && detection.expressions) {
        const dominant = Object.entries(detection.expressions);
        const mood = dominant.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
        const { data } = await axios.get(`http://localhost:3000/songs?mood=${mood}`);
        console.log(mood);
        setSongs(data.songs);
      }
    }, 500);
  };

  //! STOP ALL
  const stopAll = () => {
    clearInterval(intervalRef.current);
    const stream = videoRef.current.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  //! TOGGLE
  const hadelToggle = async () => {
    if (!isRunning) {
      await loadModels();
      await startCamera();
      detectExpression();
    } else {
      stopAll();
    }
    setisRunning(!isRunning);
  };

  return (
    <div className="facial-wrapper">
      <div className="facial-card">
        {/* Header */}
        <div className="facial-header">
          <span className="tag">👁 AI Detection</span>
          <h1>Facial <span>Expression</span></h1>
          <p>Let your face choose the music</p>
        </div>

        {/* Video */}
        <div className={`video-container ${isRunning ? 'running' : ''}`}>
          {/* corner brackets */}
          <div className="bracket-bl" />
          <div className="bracket-br" />
          <div className="scan-line" />

          <video ref={videoRef} muted autoPlay />

          {!isRunning && (
            <div className="video-idle">
              <span className="idle-icon">📷</span>
              Camera is off
            </div>
          )}
        </div>

        {/* Button */}
        <button
          className={`facial-btn ${isRunning ? 'stop' : 'start'}`}
          onClick={hadelToggle}
        >
          {isRunning ? '⏹ Stop Detection' : '▶ Start Detection'}
          {!isRunning && <span className="btn-ping" />}
        </button>

        {/* Status */}
        <div className="status-pill">
          <span className={`dot ${isRunning ? 'active' : ''}`} />
          {isRunning ? 'Detecting expressions...' : 'Camera inactive'}
        </div>
      </div>
    </div>
  );
};

export default FacialExpression;