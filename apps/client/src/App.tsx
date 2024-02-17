import { RouterProvider } from 'react-router-dom';
import router from './router';
import ViewportProvider from './context/ViewportContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './config/queryClient';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './context/ThemeContext';
import { toasterConfig } from './config/toaster';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ViewportProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster {...toasterConfig} />
          <RouterProvider router={router} />
        </ViewportProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
