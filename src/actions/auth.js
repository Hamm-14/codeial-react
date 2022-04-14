import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailure(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    error: errorMessage,
  };
}

export function loginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          //dispatch action to save user
          dispatch(loginSuccess(data.data.token));
          return;
        }
        dispatch(loginFailure(data.message));
      });
  };
}
