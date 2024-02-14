import LogoLink from '../../Logo/LogoLink';
import SidebarToggle from '../Sidebar/SidebarToggle';
import LinkIcon from '../../Links/LinkIcon';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header = (props: HeaderProps) => {
  const className = [
    'fixed',
    'top-0',
    'z-10',
    'w-full',
    'h-var-header',
    'flex',
    'items-center',
    'justify-between',
    'px-4',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark'
  ];

  if (props.className) className.push(props.className);

  return (
    <header className={className.join(' ')}>
      <nav className="flex items-center gap-4">
        <SidebarToggle />
        <LogoLink />
      </nav>
      <nav className="flex items-center gap-4">
        <LinkIcon icon="video" to="/create" />
        <LinkIcon icon="notifications" to="/notifications" />
        <Link className="w-8 h-8 rounded-full bg-gray-400" to="/profile" />
      </nav>
    </header>
  );
};

export default Header;
