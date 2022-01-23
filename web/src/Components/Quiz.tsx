import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchQuizPage } from '../api';
import { QuizPage } from '../types';
import { QuestionItem } from './QuestionItem';


export const Quiz = () => {
  const { key } = useParams<{ key: string }>();
  const contents = useQuery<QuizPage>("quiz-page", () => fetchQuizPage(key!));

  return (
    <Box p={2}>
      <Typography variant="h3">{contents.data?.title}</Typography>
      <h2>{contents.data?.description}</h2>
      <div>
        {contents.data?.questions?.map((part, index) => {
          return <QuestionItem question={part} key={index} />
        })}
      </div>
    </Box>
  )
}
