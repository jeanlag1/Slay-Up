import { useState, useEffect } from 'react';

const API_KEY = "xxxxxxxxxxxxxxxxxxxxxxx";
export default function DadJokes(props) {
    const [jokesetup, setJokeSetup] = useState('...');
    const [jokeAnswerVisible, setJokeAnswerVisible] = useState(false);
    const [showSeeAnswer, setShowSeeAnswer] = useState(true);
    const [jokePunchline, setJokePunchline] = useState('...');

    function showJokeAnswer() {
        return (
            <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
                <div>
                    <div style={{ fontStyle: 'italic', fontSize: 26, color: "darkred" , textAlign: "center"}}> - {jokePunchline}</div>
                </div>
                <img src={require("./im.png")} height="170" width="170"/> 
            </div>

        );
    }
    const jokeSetup = useEffect(
        () => {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
                }
            };
            fetch('https://dad-jokes.p.rapidapi.com/random/joke', options)
            .then((resp => resp.json()))
            .then(function (response) {
                console.log(response);
                setJokePunchline(response.body[0].punchline);
                setTimeout(() => {
                    console.log("here: ", response.body[0].setup);
                    setJokeSetup(response.body[0].setup);
                    setJokeAnswerVisible(false);
                    setShowSeeAnswer(true)
                }, 3500)
            }).catch(function (error) {
                console.error(error);
            });
            console.log("smtg");
        },
        [props.mood]
    );
    return (
        <div style={{ flex: 1, justifyContent: 'space', borderWidth: 5, borderColor: "black" }}>
            <div >
                <h3 style={{ fontSize: 50, textAlign: 'center' }}> MOOD CHANGER</h3>
            </div>
            <div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingLeft: 40, paddingRight: 40 }}>
                    <div >
                        <text style={{ fontStyle: 'italic', fontSize: 32, color: "darkgrey", textAlign:"center"}}>"{jokesetup}"</text>
                    </div>
                    {jokeSetup}
                    {jokeAnswerVisible && showJokeAnswer()}
                    {showSeeAnswer && !jokeAnswerVisible && (
                        <button
                            onClick={(e) => {
                                setJokeAnswerVisible(true);
                                setShowSeeAnswer(false)
                            }}
                        > See punchline </button>
                    )}
                </div>

            </div>
        </div>
    );
}