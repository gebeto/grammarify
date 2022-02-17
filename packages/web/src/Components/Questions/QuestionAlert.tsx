import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


export enum QuestionAlertState {
  success = 'success',
  error = 'error',
  info = 'info',
}


const defaultMessages: Record<QuestionAlertState, string> = {
  [QuestionAlertState.success]: "Success. Press enter to go next",
  [QuestionAlertState.error]: "Incorrect. Try again",
  [QuestionAlertState.info]: "Info:",
}


export type QuestionAlertProps = {
  state?: QuestionAlertState;
  messages?: Record<QuestionAlertState, string>;
};


export const QuestionAlert: React.VFC<QuestionAlertProps> = ({ state, messages = defaultMessages }) => {
  return (
    <Box
      sx={{
        mt: 2,
        opacity: state ? 1 : 0
      }}
    >
      <Alert severity={state}>{state && messages[state]}</Alert>
    </Box>
  );
}
