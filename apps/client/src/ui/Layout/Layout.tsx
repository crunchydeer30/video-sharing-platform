import SidebarHidden from './Sidebar/SidebarHidden';
import Header from './Header/Header';
import SidebarProvider from '../../context/SidebarContext';
import Main from './Main/Main';
import SidebarContent from './Sidebar/SidebarContent';
import ProfilePopupProvider from '../../context/ProfilePopupContext';
import ProfilePopup from './ProfilePopup/ProfilePopup';

const Layout = () => {
  const className = [
    'text-var-text-primary',
    'dark:text-var-text-primary-dark',
    'bg-var-bg-primary',
    'dark:bg-var-bg-primary-dark',
    'pt-var-header',
    'min-h-screen',
    'h-[1px]'
  ];

  return (
    <ProfilePopupProvider>
      <SidebarProvider>
        <div className={className.join(' ')}>
          <ProfilePopup />
          <Header />
          <SidebarHidden>
            <SidebarContent className="py-5" />
          </SidebarHidden>
          <Main />
        </div>
      </SidebarProvider>
    </ProfilePopupProvider>
  );
};

export default Layout;
