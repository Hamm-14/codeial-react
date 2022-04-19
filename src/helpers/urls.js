const rootAPI = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
  fetchPosts: (page = 1, limit = 5) =>
    `${rootAPI}/posts?page=${page}&limit=${limit}`,
  login: () => `${rootAPI}/users/login`,
  signup: () => `${rootAPI}/users/signup`,
  editUser: () => `${rootAPI}/users/edit`,
  fetchUser: (userId) => `${rootAPI}/users/${userId}`,
  userFriends: () => `${rootAPI}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${rootAPI}/friendship/create_friendship?user_id=${userId}`,
  removeFriend: (userId) =>
    `${rootAPI}/friendship/remove_friendship?user_id=${userId}`,
  createPost: () => `${rootAPI}/posts/create`,
  createComment: () => `${rootAPI}/comments`,
  toggleLike: (id, likeType) =>
    `${rootAPI}/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`,
  userSearch: (searchText) => `${rootAPI}/users/search?text=${searchText}`,
};
