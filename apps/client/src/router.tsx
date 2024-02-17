import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import Layout from './ui/Layout/Layout';
import LayoutFull from './ui/Layout/LayoutFull';
import NotFound from './pages/NotFound';
import Feed from './pages/Feed';
import Login from './pages/SignIn';
import Protected from './features/auth/components/Protected';
import SignUp from './pages/SignUp';
import { Protection } from './features/auth/types';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<LayoutFull />}>
        <Route index element={<Feed />} />
      </Route>
      <Route element={<Layout />}>
        <Route element={<Protected protection={Protection.Unauthorized} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;
