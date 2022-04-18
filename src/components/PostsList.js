import React from 'react';
import propTypes from 'prop-types';
import CreatePost from './CreatePost';
import Post from './Post';

class PostsList extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: propTypes.array.isRequired,
};

export default PostsList;
