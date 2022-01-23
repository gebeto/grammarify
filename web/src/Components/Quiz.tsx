import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchQuizPage } from '../api';
import { QuizPage } from '../types';
import { QuestionItem } from './QuestionItem';


export const Quiz = () => {
  const { key } = useParams<{ key: string }>();
  const contents = useQuery<QuizPage>("quiz-page", () => fetchQuizPage(key!));

  return (
    <div>
      <h1>{key} {contents.data?.title}</h1>
      <h2>{contents.data?.description}</h2>
      <div>
        {contents.data?.questions?.map((part, index) => {
          return <QuestionItem question={part} key={index} />
        })}
      </div>
    </div>
  )
}
