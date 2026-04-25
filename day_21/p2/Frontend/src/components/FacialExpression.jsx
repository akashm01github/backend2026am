import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";

import '../components/FacialExpression.scss'

const FacialExpression = () => {
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    const [isRunning, setIsRunning] = useState(false);


    const loadModels = async () => {
        const MODEL_URL = "/models";

        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            
        ]);

        console.log("✅ Models loaded");
    };


    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        videoRef.current.srcObject = stream;
    };



    const detectExpression = async () => {
        intervalRef.current = setInterval(async () => {
            if (!videoRef.current) return;

            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceExpressions();


            // if (detection && detection.expressions) {
            //     console.log("Expressions:", detection.expressions);
            // }

            if (detection && detection.expressions) {
                const dominant = Object.entries(detection.expressions)
                    .reduce((a, b) => a[1] > b[1] ? a : b)[0];

                console.log("Expression:", dominant); // e.g. "happy", "sad", "angry"
            }
        }, 500);
    };



    const stopAll = () => {
        clearInterval(intervalRef.current);

        const stream = videoRef.current.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        videoRef.current.srcObject = null;
    };


    const handleToggle = async () => {
        if (!isRunning) {
            await loadModels();
            await startVideo();
            detectExpression();
        } else {
            stopAll();
        }

        setIsRunning(!isRunning);
    };


    return (
        <div className="container">
            <h2>Face Expression Detector</h2>

           <div>
             <video
                ref={videoRef}
                autoPlay
                muted
                width="300"
                height="300"
                style={{ border: "1px solid #ccc" }}
            />

            <br />

            <button className="detect_btn" onClick={handleToggle}>
                {isRunning ? "Stop Detection" : "Start Detection"}
            </button>

           </div>
        </div>
    );

}

export default FacialExpression