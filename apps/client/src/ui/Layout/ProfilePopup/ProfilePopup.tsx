import { useContext, useEffect, useRef } from 'react';
import { ProfilePopupContext } from '../../../context/ProfilePopupContext';
import ChannelLink from './ChannelLink';
import ProfilePopupLink from './ProfilePopupLink';
import { useLocation } from 'react-router-dom';
import ProfilePopupButton from './ProfilePopupButton';
import useSignOut from '../../../features/auth/hooks/useSignOut';

interface ProfilePopupProps {
  classname?: string;
}

const ProfilePopup = (props: ProfilePopupProps) => {
  const className = [
    'fixed',
    'top-var-header',
    '-mt-4',
    'right-8',
    'z-[1000]',
    'border-[1px]',
    'border-var-bg-tertiary',
    'dark:border-var-bg-tertiary-dark',
    'w-[300px]',
    'bg-var-bg-secondary',
    'dark:bg-var-bg-secondary-dark',
    'rounded-lg',
    'shadow',
    'py-2'
  ];

  if (props.classname) className.push(props.classname);

  const { isToggled, setIsToggled } = useContext(ProfilePopupContext);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const signOut = useSignOut();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const currentTarget = (event.target as HTMLElement).parentElement;

      if (
        isToggled &&
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        currentTarget?.id !== 'profile-popup'
      ) {
        setIsToggled(false);
      }
    };

    if (isToggled) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isToggled, setIsToggled]);

  useEffect(() => {
    setIsToggled(false);
  }, [location]);

  if (!isToggled) return null;

  return (
    <div className={className.join(' ')} ref={ref}>
      <ChannelLink />
      <ProfilePopupLink icon="help" to="/help" children="Help" />
      <ProfilePopupLink icon="settings" to="/settings" children="Settings" />
      <ProfilePopupButton icon="logout" children="Logout" onClick={signOut} />
    </div>
  );
};

export default ProfilePopup;
