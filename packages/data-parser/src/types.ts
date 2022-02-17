export enum QuestionPartType {
  text = 'text',
  input = 'input',
}


export type QuestionPartText = {
  type: QuestionPartType.text;
  value: string;
};


export type QuestionPartInput = {
  type: QuestionPartType.input;
  answer: string;
  answerList: string[];
  verb: string;
};


export type QuestionPart = QuestionPartText | QuestionPartInput;


export type Question = {
  isQuestion: boolean;
  isTwoParts: boolean;
  parts: QuestionPart[];
}


export type QuizPage = {
  title: string;
  description: string;
  questions: Question[];
}


export type ContentsResponse = {
  key: string;
  title: string;
  description: string;
}[];