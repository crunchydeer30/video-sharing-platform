import useUser from '../hooks/useUser';
import { Protection } from '../types';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
  protection?: Protection;
  redirectTo?: string;
}

const Protected = (props: Props) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  switch (props.protection) {
    case Protection.Authorized:
      if (!user) {
        return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
      }
      break;
    case Protection.Unauthorized:
      if (user) {
        return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
      }
      break;
    case Protection.HasChannel:
      if (!user?.channel) {
        return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
      }
      break;
    case Protection.HasNoChannel:
      if (user?.channel) {
        return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
      }
      break;
  }

  return props.children ? props.children : <Outlet />;
};

export default Protected;
