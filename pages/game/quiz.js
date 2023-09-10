import { useState } from 'react';

import Header from '../../components/Header';

import dbConnect from '../../utils/dbConnect';

import styles from '../../styles/quiz.module.css'

//import GameResultModel from '../../models/GameResultModel';

//import GameResultModel from '../models/GameResultModel';

// Usage of GameResultModel in your Next.js components or routes



//dbConnect();

const questions = [

{

question: 'Mikä on pääkaupunki Ranskassa?',

options: ['Lontoo', 'Pariisi', 'Berliini', 'Rooma'],

correctAnswer: 'Pariisi',

},

{

question: 'Kuinka monta planeettaa on aurinkokunnassamme?',

options: ['5', '8', '9', '12'],

correctAnswer: '8',

},

// Lisää lisää kysymyksiä tähän

];

export default function Quiz() {

const [score, setScore] = useState(0);

const [currentQuestion, setCurrentQuestion] = useState(0);

const [showResult, setShowResult] = useState(false);

const handleAnswer = (selectedOption) => {

if (selectedOption === questions[currentQuestion].correctAnswer) {

  setScore(score + 1);

}

if (currentQuestion + 1 < questions.length) {

  setCurrentQuestion(currentQuestion + 1);

} else {

//saveGameResult();

setShowResult(true);

}

};

//const saveGameResult = async () => {

//const newGameResult = new GameResultModel({ score });

//await newGameResult.save();

//};

return (

<div className={styles.quizContainer}>

  <Header />

  {showResult ? (

<div>

<h2 className={styles.result}>Pelitulokset</h2>

<p className={styles.result}>Pistemääräsi: {score}</p>

</div>

) : (

<div>

<h2 className={styles.question}>Kysymys {currentQuestion + 1}: {questions[currentQuestion].question}</h2>

<div className={styles.options}>

  {questions[currentQuestion].options.map((option, index) => (

  <button key={index} className={styles.option} onClick={() =>        
  handleAnswer(option)}>

  {option}

  </button>

  ))}

</div>
</div>

)}

</div>

);

}