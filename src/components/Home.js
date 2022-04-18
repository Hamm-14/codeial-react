import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import FriendsList from './FriendsList';
import { fetchFriends } from '../actions/friends';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class Home extends Component {
  componentDidMount() {
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      this.props.dispatch(fetchFriends());
    }
  }

  render() {
    const { posts, friends, isLoggedIn } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(Home);
