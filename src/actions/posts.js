import { APIUrls } from '../helpers/urls';
import { getFormBody, getAuthTokenFromLocalStorage } from '../helpers/utils';
import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
} from './actionTypes';

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

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLikeToStore(id, likeType, userId) {
  return (dispatch) => {
    const url = APIUrls.toggleLike(id, likeType);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(updatePostLike(id, userId));
        }
      });
  };
}

export function updatePostLike(postId, userId) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
  };
}
