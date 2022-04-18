import { ADD_FRIEND, FETCH_USER_FRIENDS } from './actionTypes';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

export function fetchUserFriends(friends) {
  return {
    type: FETCH_USER_FRIENDS,
    friends,
  };
}

export function fetchFriends() {
  return (dispatch) => {
    const url = APIUrls.userFriends();

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(fetchUserFriends(data.data.friends));
      });
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}
