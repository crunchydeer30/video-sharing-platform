import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { ViewportContext } from '../../../context/ViewportContext';
import { SidebarContext } from '../../../context/SidebarContext';

interface MainFullProps {
  className?: string;
}

const MainFull = (props: MainFullProps) => {
  const className = ['min-h-full', 'flex-col', 'pt-var-header'];

  if (props.className) className.push(props.className);

  const { isSidebarToggled } = useContext(SidebarContext);
  const { isMobile } = useContext(ViewportContext);

  if (!isMobile && isSidebarToggled) className.push('ml-var-sidebar-minified');
  if (!isMobile && !isSidebarToggled) className.push('ml-var-sidebar');

  return (
    <main className={className.join(' ')}>
      <Outlet />
    </main>
  );
};

export default MainFull;
