import Header from './Header/Header';
import SidebarVisible from './Sidebar/SidebarVisible';
import SidebarHidden from './Sidebar/SidebarHidden';
import { useContext } from 'react';
import { ViewportContext } from '../../context/ViewportContext';
import SidebarProvider from '../../context/SidebarContext';
import MainFull from './Main/MainFull';
import SidebarContent from './Sidebar/SidebarContent';
import ProfilePopupProvider from '../../context/ProfilePopupContext';
import ProfilePopup from './ProfilePopup/ProfilePopup';

interface LayoutProps {
  className?: string;
}

const FeedLayout = (props: LayoutProps) => {
  const className = [
    'text-var-text-primary',
    'dark:text-var-text-primary-dark',
    'bg-var-bg-primary',
    'dark:bg-var-bg-primary-dark',
    'min-h-screen',
    'h-[1px]'
  ];

  if (props.className) className.push(props.className);

  const { isMobile } = useContext(ViewportContext);

  return (
    <ProfilePopupProvider>
      <SidebarProvider>
        <div className={className.join(' ')}>
          <ProfilePopup />
          {isMobile && <SidebarHidden />}
          <Header />
          {!isMobile && (
            <SidebarVisible>
              <SidebarContent className="pt-2" />
            </SidebarVisible>
          )}
          <MainFull />
        </div>
      </SidebarProvider>
    </ProfilePopupProvider>
  );
};

export default FeedLayout;
