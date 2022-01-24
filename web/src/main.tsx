import ReactDOM from 'react-dom';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Quiz } from './Components/Quiz';
import { Contents } from './Components/Contents';
import { AppLayout } from './Components/AppLayout';

import { Test } from './Components/Test';


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
      <CssBaseline />
      <HashRouter>
        <React.Suspense fallback={<AppLayout title="Loading..." />}>
          <Routes>
            <Route path="/" element={<Contents />} />
            <Route path="/quiz/:key" element={<Quiz />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </React.Suspense>
      </HashRouter>
    </QueryClientProvider>
   )
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)
