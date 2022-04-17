import { APIUrls } from '../helpers/urls';
import { UPDATE_POSTS } from './actionTypes';

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
