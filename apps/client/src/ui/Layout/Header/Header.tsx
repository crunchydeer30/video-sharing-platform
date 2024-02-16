import LogoLink from '../../Logo/LogoLink';
import SidebarToggle from '../Sidebar/SidebarToggle';
import LinkIcon from '../../Links/LinkIcon';
import { Link } from 'react-router-dom';
import useUser from '../../../features/auth/hooks/useUser';

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps) => {
  const className = [
    'z-10',
    'fixed',
    'top-0',
    'w-full',
    'h-var-header',
    'flex',
    'items-center',
    'justify-between',
    'px-4',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'border-var-bg-tertiary',
    'dark:border-var-bg-tertiary-dark'
  ];

  if (props.className) className.push(props.className);

  const { user } = useUser();

  return (
    <header className={className.join(' ')}>
      <nav className="flex items-center gap-4">
        <SidebarToggle />
        <LogoLink />
      </nav>
      <nav className="flex items-center gap-4">
        <LinkIcon icon="video" to="/create" />
        <LinkIcon icon="notifications" to="/notifications" />
        {user ? (
          <Link className="w-8 h-8 rounded-full bg-gray-400" to="/profile">
            <img
              className="w-full h-full object-cover rounded-full"
              src={user.image}
              alt="avatar"
            />
          </Link>
        ) : (
          <Link
            className="border border-blue-500 px-4 py-1 rounded-full text-blue-500"
            to="/login"
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
