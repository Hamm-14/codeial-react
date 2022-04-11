import { UPDATE_POSTS } from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = 'http://localhost:8000/api/v2/posts';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Fetched Posts', data.posts);
        dispatch(updatePosts(data.posts));
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
