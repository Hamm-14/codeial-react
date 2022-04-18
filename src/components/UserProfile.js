import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProfile, clearProfileState } from '../actions/profile';

class UserProfile extends Component {
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

  render() {
    const { user } = this.props.profile;
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
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(UserProfile);
