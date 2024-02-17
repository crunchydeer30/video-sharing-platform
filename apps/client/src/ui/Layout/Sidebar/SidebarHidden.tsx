import SidebarToggle from './SidebarToggle';
import LogoLink from '../../Logo/LogoLink';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarHiddenProps {
  className?: string;
  children?: React.ReactNode;
}

import { useContext, useEffect } from 'react';
import { SidebarContext } from '../../../context/SidebarContext';

const SidebarHidden = (props: SidebarHiddenProps) => {
  const { isSidebarToggled, setIsSidebarToggled } = useContext(SidebarContext);
  const ref = useRef<HTMLElement>(null);
  const location = useLocation();

  const className = [
    'h-screen',
    'fixed',
    'top-0',
    'py-[12px]',
    'w-var-sidebar',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'duration',
    '-left-var-sidebar',
    'overflow-auto',
    'z-10'
  ];

  if (isSidebarToggled) className.push('left-0');
  else className.push('-left-var-sidebar');

  useEffect(() => {
    if (isSidebarToggled) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSidebarToggled &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsSidebarToggled(false);
      }
    };

    if (isSidebarToggled)
      document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarToggled, setIsSidebarToggled]);

  useEffect(() => {
    if (isSidebarToggled) setIsSidebarToggled(false);
  }, [location]);

  if (props.className) className.push(props.className);

  return (
    <>
      {isSidebarToggled && <div className="bg-blur"></div>}
      <aside className={className.join(' ')} ref={ref}>
        <section className="flex items-center gap-4 px-4">
          <SidebarToggle />
          <LogoLink />
        </section>
        {props.children}
      </aside>
    </>
  );
};

export default SidebarHidden;
