import { createContext } from 'react';
import { useReducer } from 'react';
import { sidebarReducer } from '../reducers/sidebarReducer';
import { ActionTypes } from '../reducers/sidebarReducer';

const initialState = false;

export const SidebarContext = createContext<{
  state: boolean;
  dispatch: React.Dispatch<ActionTypes>;
}>({ state: initialState, dispatch: () => null });

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  return (
    <SidebarContext.Provider value={{ state, dispatch }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
