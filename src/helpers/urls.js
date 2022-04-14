const rootAPI = 'http://localhost:8000/api/v1';

export const APIUrls = {
  fetchPosts: (page = 1, limit = 5) =>
    `${rootAPI}/posts/?page=${page}&limit=${limit}`,
  login: () => `${rootAPI}/users/create-session`,
  signup: () => `${rootAPI}/users/create-user`,
};
