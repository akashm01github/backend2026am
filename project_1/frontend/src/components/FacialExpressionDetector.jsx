import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

import './facialExpression.css'
import MoodSongs from "./MoodSongs";

function FacialExpressionDetector() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const intervalRef = useRef(null);

    const [isDetecting, setIsDetecting] = useState(false);

    //! Load models once
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = "/models";

            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ]);
        };

        loadModels();
    }, []);

    //! Start webcam once
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Camera error:", err));
    }, []);

    //! Start detection
    const startDetection = () => {
        if (intervalRef.current) return;

        intervalRef.current = setInterval(async () => {
            if (!videoRef.current || videoRef.current.readyState !== 4) return;

            const video = videoRef.current;

            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();

            const resizedDetections = faceapi.resizeResults(detections, {
                width: video.videoWidth,
                height: video.videoHeight,
            });

            if (resizedDetections.length > 0) {
                const expressions = resizedDetections[0].expressions;

                const emotion = Object.keys(expressions).reduce((a, b) =>
                    expressions[a] > expressions[b] ? a : b
                );

                console.log(emotion); // 👉 logs: happy
            }
        }, 500);
    };

    //! Stop detection
    const stopDetection = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    //! Button toggle
    const toggleDetection = () => {
        if (isDetecting) {
            stopDetection();
        } else {
            startDetection();
        }
        setIsDetecting(!isDetecting);
    };

    return (
        <div style={{ textAlign: "center" }} className="mood_element">
            <h1 className="heading">Face API React App</h1>

            <div style={{ position: "relative", display: "inline-block" }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{ borderRadius: "10px" }}
                    className="user_video_feed"
                />
    
            </div>

            <br />

            <button
                className="btn"
                onClick={toggleDetection}
            >
                {isDetecting ? "Stop Detection" : "Start Detection"}
            </button>

            <MoodSongs/>
        </div>
    );
}

export default FacialExpressionDetector;
