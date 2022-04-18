import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile, clearProfileState } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props.params;
    if (userId) {
      //dispatch an action to fetch user-data
      this.props.dispatch(fetchProfile(userId));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileState());
  }

  checkIfUserIsFriend = () => {
    const { friends } = this.props;
    const { userId } = this.props.params;

    console.log('FRIENDS', friends);

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const { userId } = this.props.params;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfully',
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { userId } = this.props.params;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed Friend Successfully',
        error: null,
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const { user } = this.props.profile;
    const { success, error, successMessage } = this.state;
    const isUserAFriend = this.checkIfUserIsFriend();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="btn-grp">
          {isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          )}

          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
