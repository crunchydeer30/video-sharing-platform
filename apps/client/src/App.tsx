import { RouterProvider } from 'react-router-dom';
import router from './router';
import ViewportProvider from './context/ViewportContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './config/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ViewportProvider>
        <RouterProvider router={router} />
      </ViewportProvider>
    </QueryClientProvider>
  );
};

export default App;
