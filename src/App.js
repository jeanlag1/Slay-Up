import * as faceapi from 'face-api.js';
import React, { useState } from 'react';
import Camera from "./Camera";
import DadJokes from "./DadJokes";
export default function App() {
    const [mood, setMood] = useState("");
    const [moodlist, setMoodlist] = useState(null);
    React.useEffect(() => {
                const loadModels = async() => {
                    const MODEL_URL = process.env.PUBLIC_URL + '/models';
                    Promise.all([
                        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    ]);
                }
                loadModels();
            }, []);
        
    return (
      <div >
          <div style={{marginLeft: 50, fontSize: 64}} >Good evening Jean :), </div>
          <h2 style={{textAlign: 'center', fontSize: 48}}> Welcome back to your daily mood check with SLAY-UP ... </h2>
          <h1 style={{textAlign: 'center', fontSize: 56}}>  Please take a picture, fool !</h1>

        <Camera  setMoods={setMoodlist} predict={setMood}/>

        <div>
            { mood ? (
                <div>
                    <div style={{textAlign: "center", fontSize: 48}}>It seems like you are <span>{mood.toUpperCase()}</span> .</div>
                    <div> {
                        mood != "happy" ? (
                            <div>
                                <div style={{textAlign: "center", fontSize: 32}}>Let's cheer you up with some dad CRAZY dad jokes !</div>
                                <DadJokes mood={mood}/>
                            </div>
                        ) :(
                            <div style={{textAlign: "center", fontSize: 32}}>Well, since you are already very happy, I won't bother you, my boy!</div>
                        )
                        } 
                    </div>
                    <div>
                        <h2> Detection details - mood probabilities :</h2>
                        <ul>{
                            moodlist && moodlist.map((mood) => <li key={mood.expression}>{mood.expression} : {mood.probability}</li>)
                            }
                        </ul>
                    </div>
                </div>
            ) : (
                <div></div>
            )
            }
        </div>

      </div>
    )
  }