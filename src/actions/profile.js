import {
  CLEAR_PROFILE_STATE,
  FETCH_PROFILE_START,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCCESS,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCCESS,
    user,
  };
}

export function userProfileFailed(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function startUserProfileFetch() {
  return {
    type: FETCH_PROFILE_START,
  };
}

export function clearProfileState() {
  return {
    type: CLEAR_PROFILE_STATE,
  };
}

//asynchronous func. to fetch details
export function fetchProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());
    const url = APIUrls.fetchUser(userId);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
        dispatch(userProfileFailed(data.message));
      });
  };
}
