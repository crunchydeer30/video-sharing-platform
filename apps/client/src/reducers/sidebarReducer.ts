export enum ActionTypes {
  TOGGLE = 'TOGGLE'
}

export const sidebarReducer = (state: boolean, action: ActionTypes) => {
  switch (action) {
    case ActionTypes.TOGGLE:
      return !state;
    default:
      return state;
  }
};
