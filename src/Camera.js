import React, { useState } from 'react'
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Camera = (props) => {
  const [picture, setPicture] = useState('')
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
    getDetections(pictureSrc);
  })

  async function getDetections(src) {
    let imag = document.createElement("img");
    imag.setAttribute("src", src);
    imag.setAttribute("alt", "anything");

    const detections = await faceapi.detectSingleFace(imag).withFaceExpressions();
    const list = detections.expressions.asSortedArray()
    props.setMoods(list);
    props.predict(list[0].expression);
    
  }

  return (
    <div style={{ width: "100%", borderWith: 5, borderColor: "black", display:"flex", flexDirection:"column", alignItems: 'center'}}>
      <div style={{ justifyContent: 'center'}}>
        {picture == '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img id="pic" src={picture} />
        )}
      </div>
      <div>
        {picture != '' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture("")
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div>
    </div>
  )
}
export default Camera