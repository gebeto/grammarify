import React from 'react';
import TextField from '@mui/material/TextField';
import { QuestionPartType, Question } from '../../types';


export type QuestionBodyProps = {
  question: Question;
  onSuccess: () => void;
};


export const QuestionBody: React.FC<QuestionBodyProps> = ({ question, onSuccess }) => {
  const [state, setState] = React.useState<'ok' | 'error'>();

  const handleEnter = (e: any) => {
    if (e.code === 'Enter') {
      const id = e.target.id;
      const data = question.parts[id];
      if (data.type === QuestionPartType.input) {
        const value = e.target.value.toLowerCase()
        if (data.answerList.some(s => s.toLowerCase() === value)) {
          if (state === 'ok') {
            onSuccess();
          } else {
            setState('ok');
          }
        } else {
          setState('error');
        }
      }
    }
  }

  return (
    <div className={`question-${state}`} onKeyUp={handleEnter}>
      {question.parts.map((part, index) => {
        if (part.type === QuestionPartType.text) {
          return (
            <span key={index} id={index.toString()}>{part.value}{' '}</span>
          );
        } else if (part.type === QuestionPartType.input) {
          return (
            <span>
              <TextField
                autoFocus
                size="small"
                variant="standard"
                key={index}
                id={index.toString()}
                placeholder={part.answer}
                inputProps={{
                  sx: {
                    pb: 0,
                  }
                }}
              />{' '}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
};