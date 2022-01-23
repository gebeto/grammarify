import ReactDOM from 'react-dom';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter, Routes, Route } from "react-router-dom";
import { Quiz } from './Components/Quiz';
import { Contents } from './Components/Contents';

import './styles.css';
import { AppBar } from './Components/AppBar';


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
      <AppBar />
      <HashRouter>
        <React.Suspense fallback="Loading...">
          <Routes>
            <Route path="/" element={<Contents />} />
            <Route path="/:key" element={<Quiz />} />
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
