import { FETCH_USER_FRIENDS } from '../actions/actionTypes';

const initialFriendState = [];

export default function friends(state = initialFriendState, action) {
  switch (action.type) {
    case FETCH_USER_FRIENDS:
      return [...action.friends];
    default:
      return state;
  }
}
