import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { logoutUser } from '../actions/auth';
import { searchUser } from '../actions/search';

class Navbar extends Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;

    this.props.dispatch(searchUser(searchText));
  };
  render() {
    const { auth, results } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="search-icon"
          />
          <input placeholder="Search" onChange={this.handleSearch} />

          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/users/${user._id}`}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                        alt="user-dp"
                      />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="right-nav">
          <div className="user">
            {auth.isLoggedIn && (
              <div className="user">
                <Link to="/settings">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                    alt="user-dp"
                    id="user-dp"
                  />
                </Link>
                <span>{auth.user.name}</span>
              </div>
            )}
          </div>
          <div className="nav-links">
            <ul>
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {auth.isLoggedIn && <li onClick={this.logout}>Logout</li>}
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
