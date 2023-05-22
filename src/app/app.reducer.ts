import { createReducer, on, Action } from '@ngrx/store';
import { getUser } from './app.actions';
 
export interface State {
    users: [],
    user: {},
    weeklyMenu: [],
    orders: []
}

export const initialState: State = {
    users: [],
    user: {},
    weeklyMenu: [],
    orders: []
};
 
const _appReducer = createReducer(
  initialState,
  on(getUser, (state, { user }) => ({...state, user: user}))
);
 
export function appReducer(state: State | undefined, action: Action) {
  return _appReducer(state, action);
}