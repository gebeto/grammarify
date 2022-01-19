import React from 'react';
import { useQuery } from 'react-query';
import { fetchQuizPage } from './api';
import { QuizPage } from './types';
import { QuestionItem } from './QuestionItem';


export const Quiz = () => {
  const contents = useQuery<QuizPage>("quiz-page", fetchQuizPage);

  return (
    <div>
      <h1>{contents.data?.title}</h1>
      <h2>{contents.data?.description}</h2>
      <div>
        {contents.data?.questions?.map((part, index) => {
          return <QuestionItem question={part} key={index} />
        })}
      </div>
      <pre>
        {JSON.stringify(contents.data, undefined, 4)}
      </pre>
    </div>
  )
}
