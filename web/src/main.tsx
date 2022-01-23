import ReactDOM from 'react-dom';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Quiz } from './Components/Quiz';
import { Contents } from './Components/Contents';

import './styles.css';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});


function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback="Loading...">
        <Contents />
      </React.Suspense>
    </QueryClientProvider>
   )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)
