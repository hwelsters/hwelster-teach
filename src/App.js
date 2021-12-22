import React, {useState, useEffect} from 'react';
import Confetti from 'react-confetti'

import logo from './content/logo.png';
import tick from './content/tick.png';
import cross from './content/cross.png';

import './App.css';
import "../node_modules/video-react/dist/video-react.css";
import axios from 'axios';

import ReactPlayer from 'react-player/youtube'

let videoLengths = 
[
  15,
  50
]

const sampleJSON = {
  "qID":"2",
  "question":"What is 2 + 2?",
  "answer":"7",
  "option1":"a",
  "option2":"a",
  "option3":"a",
  "option4":"a",
  "reason": "bonk",
  "link":"https://youtu.be/Fe8u2I3vmHU"
};

const bonkSon = {
  "question":"b",
  "option1":"b",
  "option2":"b",
  "option3":"b",
  "option4":"b"
};


function App() {

  const handleAnswerOptionClick = (option) => {
    if (option === res.option2) {
      
      setCongratulate(true);
      setWrong(false);

      const timeout = setTimeout(() => {
        setCongratulate(false)
      }, 2000)

      setQuesNo(quesNo + 1);

      if (currQues === '/0') setCurrQues('/1');
      else if (currQues === '/1') setCurrQues('/2');
      else if (currQues === '/2') setCurrQues('/3');
      else if (currQues === '/3') setCurrQues('/4');
      else if (currQues === '/4') setCurrQues('/5');

      setPopped(false);

      setPlaying(true);
		}
    else 
    {
      setWrong(true);
      const timeout = setTimeout(() => {
        setWrong(false);
      }, 1000)
    }
	};

  const [popped, setPopped] = useState(false);
  const [res, setRes] = useState(sampleJSON);
  const [currQues, setCurrQues] = useState('');
  const [congratulate, setCongratulate] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [asked, setAsked] = useState(false);

  const [vidPlaying, setPlaying] = useState(true);
  
  const [currVid, setCurrVid] = useState(0);

  const [quesNo, setQuesNo] = useState(0);

  let config = {
    headers: {
      "Content-Type" : "application/json",
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true
    }
  }

  useEffect(function() {
    axios.get('', config)
      .then(response => setRes(response.data));
  }, [])

  function endVideo()
  {
    setCurrVid(currVid + 1);
    setAsked(false);
  }

  function pauseVid(played) {
    if (asked) return;
    if (played > videoLengths[quesNo])
    {
      setPopped(true);
    }
  }

  function Modal() {
    setPlaying(false);
    return (
    <div id="myModal" class="modal">
      <div className="modal-content">
    <div className="modal-header">
      <h2>{res.question}</h2>
    </div>
    <div className="modal-body">
      <button onClick={() => handleAnswerOptionClick("1")}>{res.option4}</button>
      <button onClick={() => handleAnswerOptionClick("2")}>{res.option3}</button>
      <button onClick={() => handleAnswerOptionClick("3")}>{res.option1}</button>
    </div>

    <div className="modal-footer">
      <h3>Modal Footer</h3>
      </div>
    </div>

  </div>)
  }
  
  return (
    <div>
      <div className="video-div">
        {congratulate? <Confetti gravity = {0.5} initialVelocityX = {10}/>: null}
        <div className = "header">
          <img src = {logo} className = "syntax-error-logo"></img>
        </div>

        <ReactPlayer url= {res.link} />

        {popped? <Modal/> : null}
        {congratulate? <img src = {tick} className = "tick"></img> : null}
        {wrong? <img src = {cross} className = "tick"></img> : null}
      </div>
    </div>
  );
}


export default App;
