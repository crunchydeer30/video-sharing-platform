import { RouterProvider } from 'react-router-dom';
import router from './router';
import ViewportProvider from './context/ViewportContext';

const App = () => {
  return (
    <ViewportProvider>
      <RouterProvider router={router} />
    </ViewportProvider>
  );
};

export default App;
