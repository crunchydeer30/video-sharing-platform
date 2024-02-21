import LogoLink from '../../Logo/LogoLink';
import SidebarToggle from '../Sidebar/SidebarToggle';
import LinkIcon from '../../Links/LinkIcon';
import { Link } from 'react-router-dom';
import useUser from '../../../features/auth/hooks/useUser';
import ProfileButton from '../ProfilePopup/ProfileButton';

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

  const { user, isLoading } = useUser();

  return (
    <header className={className.join(' ')}>
      <nav className="flex items-center gap-4">
        <SidebarToggle />
        <LogoLink />
      </nav>
      <nav className="flex items-center gap-4">
        <LinkIcon icon="video" to="/create" />
        <LinkIcon icon="notifications" to="/notifications" />
        {user && <ProfileButton />}
        {isLoading && <div className="w-8 h-8 bg-gray-300 rounded-full"></div>}
        {!user && !isLoading && (
          <Link
            className="border-[1px] border-blue-500 px-4 py-1 rounded-full \ 
            text-blue-500 hover:text-blue-600 hover:border-blue-600 duration"
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
