import useUser from '../hooks/useUser';
import { Protection } from '../types';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  protection?: Protection;
  redirectTo?: string;
}

const Protected = (props: Props) => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (props.protection === Protection.Authorized && !user) {
    return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
  }

  if (props.protection === Protection.Unauthorized && user) {
    return <Navigate to={props.redirectTo ?? '/'} replace={true} />;
  }

  return props.children ? props.children : <Outlet />;
};

export default Protected;
