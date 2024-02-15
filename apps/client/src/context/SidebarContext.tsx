import { createContext } from 'react';
import { useState } from 'react';

const initialState = false;

export const SidebarContext = createContext<{
  isSidebarToggled: boolean;
  setIsSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isSidebarToggled: initialState, setIsSidebarToggled: () => null });

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarToggled, setIsSidebarToggled }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
