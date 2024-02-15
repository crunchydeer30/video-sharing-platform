import { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';
import SidebarLinkSm from './SidebarLinkSm';

interface SidebarVisibleProps {
  className?: string;
  children?: React.ReactNode;
}

const SidebarVisible = (props: SidebarVisibleProps) => {
  const className = [
    'h-full',
    'fixed',
    'top-0',
    'w-var-sidebar',
    'pt-var-header',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'flex',
    'flex-col'
  ];

  if (props.className) className.push(props.className);

  const { state: isOpen } = useContext(SidebarContext);

  if (isOpen) return SidebarMinified();

  return <aside className={className.join(' ')}>{props.children}</aside>;
};

const SidebarMinified = () => {
  const className = [
    'h-screen',
    'fixed',
    'top-0',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'pt-var-header',
    'w-var-sidebar-minified'
  ];

  return (
    <aside className={className.join(' ')}>
      <nav className="flex flex-col gap-2 pt-4">
        <SidebarLinkSm icon="home" to="/">
          Home
        </SidebarLinkSm>
        <SidebarLinkSm icon="subscriptions" to="/subscriptions">
          Subscriptions
        </SidebarLinkSm>
        <SidebarLinkSm icon="you" to="/you">
          You
        </SidebarLinkSm>
      </nav>
    </aside>
  );
};

export default SidebarVisible;
