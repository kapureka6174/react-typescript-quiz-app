import shurffleArray from './utils';

// APIから取ってきたデータの型
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

type Response = { response_code: number; results: Question[] };

export type QuestionState = Question & { answers: string[] };

// APIを叩くときに使用する問題の難易度
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = (await (await fetch(endpoint)).json()) as Promise<Response>;

  // 不正解と正解をランダムに並べ替えて返す
  return (await data).results.map((question: Question) => ({
    ...question,
    answers: shurffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  })) as QuestionState[];
};
