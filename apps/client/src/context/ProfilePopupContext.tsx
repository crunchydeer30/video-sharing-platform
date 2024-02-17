import { createContext, useState } from 'react';

interface ProfilePopupContext {
  isToggled: boolean;
  setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfilePopupContext = createContext<ProfilePopupContext>({
  isToggled: false,
  setIsToggled: () => {}
});

const ProfilePopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProfilePopupToggled, setIsProfilePopupToggled] = useState(false);

  return (
    <ProfilePopupContext.Provider
      value={{
        isToggled: isProfilePopupToggled,
        setIsToggled: setIsProfilePopupToggled
      }}
    >
      {children}
    </ProfilePopupContext.Provider>
  );
};

export default ProfilePopupProvider;
