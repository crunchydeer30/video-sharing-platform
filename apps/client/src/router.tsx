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
import ChannelCreate from './pages/ChannelCreate';
import { Protection } from './features/auth/types';
import Channel from './pages/Channel';
import UploadVideo from './pages/UploadVideo';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<LayoutFull />}>
        <Route index element={<Feed />} />
        <Route path="/channel/:handle" element={<Channel />} />
      </Route>

      <Route element={<Layout />}>
        <Route element={<Protected protection={Protection.Unauthorized} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Route>

        <Route
          element={
            <Protected protection={Protection.Authorized} redirectTo="/login" />
          }
        >
          <Route element={<Protected protection={Protection.HasNoChannel} />}>
            <Route path="/channel/create" element={<ChannelCreate />} />
          </Route>

          <Route
            element={
              <Protected
                protection={Protection.HasChannel}
                redirectTo="/channel/create"
              />
            }
          >
            <Route path="/upload" element={<UploadVideo />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default router;
