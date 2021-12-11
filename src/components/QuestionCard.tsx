import React from 'react';

// Types
import type { AnswerObject } from '../App';

type Props = {
  score: number;
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  score,
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div className="w-full">
    <div className="flex flex-col items-center">
      <div className="flex my-1">
        <p className="mr-32">スコア：{score}</p>
        <p>
          問題： {questionNr} / {totalQuestions}
        </p>
      </div>
      <p className="my-8">{question}</p>
    </div>
    <div>
      {answers.map((answer) => (
        <div key={answer} className="flex flex-col items-center">
          <button
            className="p-2 my-1 w-4/5 bg-blue-100 hover:bg-blue-300 rounded-md"
            disabled={!!userAnswer}
            value={answer}
            onClick={callback}
          >
            <span
              className={
                (answer === userAnswer?.correctAnswer ? 'text-green-500' : '') +
                (userAnswer && answer !== userAnswer?.correctAnswer
                  ? 'text-red-500'
                  : '')
              }
            >
              {answer}
            </span>
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
