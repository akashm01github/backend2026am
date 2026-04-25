import React, { useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { concat } from './../../node_modules/@tensorflow/tfjs-core/src/ops/concat_split';

const FaceExp = () => {

    const videoRef = useRef(null);

    const interValRef = useRef(null);

    const [isRunning, setisRunning] = useState(false);


    //! LOAD MODEL

    const loadModel = async () => {
        const URL = '/models'
        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(URL),
            faceapi.nets.faceExpressionNet.loadFromUri(URL)
        ])

        console.log('Model Loaded')
    }

  

    //! START VIDEO

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        videoRef.current.srcObject = stream
    }

    


    //! DETECT

    const detectExpression = async () => {
        interValRef.current = setInterval(async () => {
            if (!videoRef.current) return;

            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

            if (detection && detection.expressions) {
                const expression = Object.entries(detection.expressions)
                    .reduce((a, b) => a[1] > b[1] ? a : b)[0]

                console.log(expression)
            }
        }, 500);
    }

  

    //! STOP

    const stopAll = ()=>{
        clearInterval(interValRef.current);
        const stream = videoRef.current.srcObject;

        if(stream){
            stream.getTracks().forEach(track => {track.stop()});
        }

        videoRef.current.srcObject = null
    }

    //! TOGGLE 

    const handelToggle = async()=>{ 
        if(!isRunning){
            await loadModel();
            await startVideo();
            await detectExpression();
        }
        else{
            stopAll()
        }

        setisRunning(!isRunning);
    }


    return (
        <div>
            <h1>Video Expression</h1>
            <video ref={videoRef} autoPlay
                muted
                width="400"
                height="300"
                style={{ border: "1px solid #ccc" }} />

                <button onClick={handelToggle}>{isRunning ? "Stop":"Start"}</button>
        </div>
    )
}

export default FaceExp