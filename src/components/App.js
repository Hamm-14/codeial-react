import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';
import { authenticateUser } from '../actions/auth';

const Settings = () => <div>Settings</div>;

const PrivateRoute = (privateRoutesProps, { children }) => {
  const { isLoggedIn, component: Component } = privateRoutesProps;

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            {auth.isLoggedIn ? (
              <Route path="/login" element={<Navigate to="/" />} />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {auth.isLoggedIn ? (
              <Route path="/signup" element={<Navigate to="/" />} />
            ) : (
              <Route path="/signup" element={<Signup />} />
            )}
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  isLoggedIn={auth.isLoggedIn}
                  component={Settings}
                />
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  posts: propTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
