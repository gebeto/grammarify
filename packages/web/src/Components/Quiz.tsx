import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchQuizPage } from '@grammarify/data-parser';
import { QuizPage } from '../types';
import { Questions } from './Questions';
import { AppLayout } from './AppLayout';


export const Quiz = () => {
  const { key } = useParams<{ key: string }>();
  const { data } = useQuery<QuizPage>("quiz-page", () => fetchQuizPage(key!));

  return (
    <AppLayout title={data?.title}>
      <Box p={2}>
        <Typography variant="h3">{data?.title}</Typography>
        <Questions title={data?.title!} questions={data?.questions!} />
      </Box>
    </AppLayout>
  )
}
