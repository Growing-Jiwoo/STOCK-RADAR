import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { APIError } from '../types/api';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export function queryErrorHandler(error: unknown): void {
  const Message =
    error instanceof AxiosError<APIError>
      ? error?.response?.data.message
      : 'error connecting to server';

  toast.error(Message);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler,
  }),
});
