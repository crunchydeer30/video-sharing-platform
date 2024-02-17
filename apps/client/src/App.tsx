import { RouterProvider } from 'react-router-dom';
import router from './router';
import ViewportProvider from './context/ViewportContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './config/queryClient';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className:
            'text-var-text-primary dark:text-var-text-primary-dark bg-var-bg-primary dark:bg-var-bg-tertiary-dark shadow-lg'
        }}
      />
      <ViewportProvider>
        <RouterProvider router={router} />
      </ViewportProvider>
    </QueryClientProvider>
  );
};

export default App;
