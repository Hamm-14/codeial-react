const rootAPI = 'http://codeial.codingninjas.com:8000/api/v2';

export const APIUrls = {
  fetchPosts: (page = 1, limit = 5) =>
    `${rootAPI}/posts/?page=${page}&limit=${limit}`,
  login: () => `${rootAPI}/users/login`,
  signup: () => `${rootAPI}/users/signup`,
  editUser: () => `${rootAPI}/users/edit`,
  fetchUser: (userId) => `${rootAPI}/users/${userId}`,
  userFriends: () => `${rootAPI}/friendship/fetch_user_friends`,
  addFriend: (userId) =>
    `${rootAPI}/friendship/create_friendship/?user_id=${userId}`,
  removeFriend: (userId) =>
    `${rootAPI}/friendship/remove_friendship/?user_id=${userId}`,
};
