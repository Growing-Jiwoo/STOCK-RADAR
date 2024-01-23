import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from './react-query/queryClient';
import { S } from './style/center.styled';
import React from 'react';
import LoadingSpinner from './components/Commons/Spinner';

function App() {
  return (
    <>
      <React.Suspense fallback={<LoadingSpinner />}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <ToastContainer position="top-center" autoClose={1500} />
            <S.Center>
              <RouterProvider router={router} />
            </S.Center>
            <ReactQueryDevtools />
          </RecoilRoot>
        </QueryClientProvider>
      </React.Suspense>
    </>
  );
}

export default App;
