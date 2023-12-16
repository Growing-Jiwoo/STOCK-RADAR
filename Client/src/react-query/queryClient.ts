import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

export function queryErrorHandler(error: unknown): void {
  const Message =
    error instanceof AxiosError
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
