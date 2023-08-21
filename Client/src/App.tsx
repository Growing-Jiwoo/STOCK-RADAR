import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from './react-query/queryClient';
import { S } from './style/center.styled';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position="top-center" autoClose={1500} />
        <S.Center>
          <RouterProvider router={router} />
        </S.Center>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
