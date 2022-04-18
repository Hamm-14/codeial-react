import {
  CLEAR_PROFILE_STATE,
  USER_PROFILE_SUCCCESS,
  USER_PROFILE_FAILURE,
  FETCH_PROFILE_START,
} from '../actions/actionTypes';

const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};

export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCCESS:
      return {
        ...state,
        success: true,
        inProgress: false,
        user: action.user,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        success: false,
        inProgress: false,
        error: action.error,
      };
    case CLEAR_PROFILE_STATE:
      return {
        ...state,
        user: {},
      };
    case FETCH_PROFILE_START:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
