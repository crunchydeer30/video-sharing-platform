import SidebarLink from './SidebarLink';
import { Link } from 'react-router-dom';
import SidebarSection from './SidebarSection';
import useUser from '../../../features/auth/hooks/useUser';

interface SidebarContentProps {
  className?: string;
}

const SidebarContent = (props: SidebarContentProps) => {
  const className = [
    'flex',
    'flex-col',
    'py-4',
    'min-h-full',
    'overflow-auto',
    'px-4'
  ];

  if (props.className) className.push(props.className);

  const { user } = useUser();

  return (
    <nav className={className.join(' ')}>
      <SidebarSection>
        <SidebarLink icon="home" to="/">
          Home
        </SidebarLink>

        <SidebarLink icon="subscriptions" to="/subscriptions">
          Subscriptions
        </SidebarLink>
      </SidebarSection>

      <SidebarSection>
        <SidebarLink to="/you" className="flex items-center gap-1">
          <span className="text-[17px]">You</span>
          <svg className="fill-current w-6 h-6">
            <use href="/icons.svg#arrow_right" />
          </svg>
        </SidebarLink>

        {user && user?.channel ? (
          <SidebarLink icon="portrait" to={`/channels/${user.channel.handle}`}>
            Your Channel
          </SidebarLink>
        ) : (
          <SidebarLink icon="portrait" to="/channels/create">
            Your Channel
          </SidebarLink>
        )}

        <SidebarLink icon="history" to="/history">
          History
        </SidebarLink>

        <SidebarLink icon="watch_later" to="/watch_later">
          Watch later
        </SidebarLink>

        <SidebarLink icon="liked" to="/favorite">
          Liked videos
        </SidebarLink>
      </SidebarSection>

      <SidebarSection>
        <SidebarLink to="/you" className="flex items-center gap-1">
          <span className="text-[17px]">You</span>
          <svg className="fill-current w-6 h-6">
            <use href="/icons.svg#arrow_right" />
          </svg>
        </SidebarLink>

        {user && user?.channel ? (
          <SidebarLink icon="portrait" to={`/channel/${user.channel.handle}`}>
            Your Channel
          </SidebarLink>
        ) : (
          <SidebarLink icon="portrait" to="/channels/create">
            Your Channel
          </SidebarLink>
        )}

        <SidebarLink icon="history" to="/history">
          History
        </SidebarLink>

        <SidebarLink icon="watch_later" to="/watch_later">
          Watch later
        </SidebarLink>

        <SidebarLink icon="liked" to="/favorite">
          Liked videos
        </SidebarLink>
      </SidebarSection>

      <SidebarSection>
        <SidebarLink icon="settings" to="/settings">
          Settings
        </SidebarLink>

        <SidebarLink icon="help" to="/help">
          Help
        </SidebarLink>
      </SidebarSection>

      <SidebarSection className="mt-auto space-y-2">
        <nav className="flex flex-wrap gap-1 font-semibold text-xs text-var-text-secondary dark:text-var-text-secondary-dark">
          <Link to="/about">About</Link>
          <Link to="/press">Press</Link>
          <Link to="/copyright">Copyright</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/creators">Creators</Link>
          <Link to="/advertise">Advertise</Link>
          <Link to="/developers">Developers</Link>
        </nav>
        <nav className="flex flex-wrap gap-1 font-semibold text-xs text-var-text-secondary dark:text-var-text-secondary-dark">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/policy">Policy & Safety</Link>
          <Link to="/how">How Youtube works</Link>
          <Link to="/test">Test new features</Link>
        </nav>
      </SidebarSection>
    </nav>
  );
};

export default SidebarContent;
