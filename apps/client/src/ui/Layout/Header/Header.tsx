import LogoLink from '../../Logo/LogoLink';
import SidebarToggle from '../Sidebar/SidebarToggle';
import LinkIcon from '../../Links/LinkIcon';
import { Link } from 'react-router-dom';

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

  return (
    <header className={className.join(' ')}>
      <nav className="flex items-center gap-4">
        <SidebarToggle />
        <LogoLink />
      </nav>
      <nav className="flex items-center gap-4">
        <LinkIcon icon="video" to="/create" />
        <LinkIcon icon="notifications" to="/notifications" />
        <Link className="w-8 h-8 rounded-full bg-gray-400" to="/login" />
      </nav>
    </header>
  );
};

export default Header;
