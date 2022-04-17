import React, { Component } from 'react';

class UserProfile extends Component {
  render() {
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
          <div className="field-value">nidaislam33@gmail.com</div>
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">Nidu</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

export default UserProfile;
