import React from 'react';
import TextField from '@mui/material/TextField';
import { QuestionPartType, Question } from '../../types';


export const QuestionItem: React.FC<{ question: Question }> = ({ question }) => {
  // need to use formik here
  const [state, setState] = React.useState<'ok' | 'error'>();

  const handleEnter = (e: any) => {
    if (e.code === 'Enter') {
      const id = e.target.id;
      const data = question.parts[id];
      if (data.type === QuestionPartType.input) {
        const value = e.target.value.toLowerCase()
        if (data.answerList.some(s => s.toLowerCase() === value)) {
          setState('ok');
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
              <TextField size="small" variant="standard" key={index} id={index.toString()} placeholder={part.answer} />{' '}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
};
