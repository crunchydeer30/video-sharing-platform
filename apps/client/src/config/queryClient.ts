import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { QueryCache } from '@tanstack/react-query';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 1000,
      refetchOnWindowFocus: false,
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status == 401) {
        queryClient.setQueryData(['user'], null);
      }
    }
  })
});

export default queryClient;
