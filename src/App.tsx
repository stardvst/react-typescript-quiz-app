import { Difficulty, fetchQuizQuestions } from './api';
import React, { useState } from 'react';

import { QuestionState } from "./api";
import QuestionCard from './components/QuestionCard';
import { GlobalStyle, Wrapper } from './App.styles';

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);

    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) {
      return;
    }

    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) {
      setScore(prev => prev + 1);
    }

    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    };

    setUserAnswers(prev => [...prev, answerObject]);
  }

  const nextQuestion = () => {
    const nextQuestionId = number + 1;
    if (nextQuestionId === TOTAL_QUESTIONS) {
      setGameOver(true);
      return;
    }

    setNumber(nextQuestionId);
  }

  fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && <button type="button" className="start" onClick={startTrivia}>
          Start
       </button>}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading questions...</p>}

        {!loading && !gameOver && <QuestionCard questionNum={number + 1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer} />}

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && <button type="button" className="next" onClick={nextQuestion} title="next">
          Next Question
      </button>}
      </Wrapper>
    </>
  );
}

export default App;
