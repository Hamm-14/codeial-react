import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';
import { ADD_POST, UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched Posts', data.data.posts);
        dispatch(updatePosts(data.data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addPost(data.data.post));
          return;
        }
      });
  };
}
