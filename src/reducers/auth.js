import { LOGIN_START, LOGIN_SUCCESS } from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        error: null,
        isLoggedIn: true,
      };
    case LOGIN_START:
      return {
        ...state,
        error: action.error,
        inProgress: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
