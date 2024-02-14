import SidebarToggle from './SidebarToggle';
import LogoLink from '../../Logo/LogoLink';

interface SidebarHiddenProps {
  className?: string;
  children?: React.ReactNode;
}

import { useContext } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';

const SidebarHidden = (props: SidebarHiddenProps) => {
  const { state: isOpen } = useContext(SidebarContext);

  const className = [
    'h-screen',
    'fixed',
    'top-0',
    'py-[12px]',
    'w-var-sidebar',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'duration',
    'z-20',
    '-left-var-sidebar',
    'overflow-auto'
  ];

  if (isOpen) className.push('left-0');
  else className.push('-left-var-sidebar');

  if (props.className) className.push(props.className);

  return (
    <aside className={className.join(' ')}>
      <section className="flex items-center gap-4 px-4">
        <SidebarToggle />
        <LogoLink />
      </section>
      {props.children}
    </aside>
  );
};

export default SidebarHidden;
