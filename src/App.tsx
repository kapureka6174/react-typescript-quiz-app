import { useState } from 'react';
import { fetchQuizQuestions, QuestionState, Difficulty } from './API';

// Components
import QuestionCard from './components/QuestionCard';

import './index.css';

export type AnswerObject = {
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
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center p-4 my-12 mx-auto md:w-1/2 h-3/5 md:h-1/2 bg-gray-100 rounded-lg border-4">
        <h1 className="text-4xl text-blue-400">クイズアプリ</h1>
        {gameOver && (
          <button
            className="my-32 w-2/3 h-12 text-3xl text-white bg-blue-600 rounded-md"
            onClick={startTrivia}
          >
            スタート
          </button>
        )}
        {loading && <p>問題を読み込んでいます...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            score={score}
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button
            className="py-1 px-6 my-2 text-white bg-gray-500 hover:bg-gray-700 rounded-md"
            onClick={() => setNumber((prev) => prev + 1)}
          >
            次の問題へ
          </button>
        ) : null}
        {userAnswers[number]?.question === questions[number]?.question &&
          number === TOTAL_QUESTIONS - 1 &&
          !gameOver && (
            <button
              className="py-1 px-6 my-2 text-white bg-gray-500 hover:bg-gray-700 rounded-md"
              onClick={() => setGameOver(true)}
            >
              スタート画面へ
            </button>
          )}
      </div>
    </div>
  );
};
export default App;
