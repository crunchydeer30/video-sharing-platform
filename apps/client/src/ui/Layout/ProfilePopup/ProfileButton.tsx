import useUser from '../../../features/auth/hooks/useUser';
import { useContext } from 'react';
import { ProfilePopupContext } from '../../../context/ProfilePopupContext';

interface ProfileButtonProps {
  className?: string;
}

const ProfileButton = (props: ProfileButtonProps) => {
  const className = [
    'w-8',
    'h-8',
    'rounded-full',
    'bg-gray-400',
    'overflow-hidden'
  ];

  if (props.className) className.push(props.className);

  const { user } = useUser();

  const { isToggled, setIsToggled } = useContext(ProfilePopupContext);

  return (
    <button
      className={className.join(' ')}
      onClick={() => setIsToggled(!isToggled)}
      id="profile-popup"
    >
      <img src={user?.image} className="w-full h-full object-cover" />
    </button>
  );
};

export default ProfileButton;
