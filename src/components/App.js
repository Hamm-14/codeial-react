import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';
import Settings from './Settings';
import UserProfile from './UserProfile';
import { authenticateUser } from '../actions/auth';
// import { fetchFriends } from '../actions/friends';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

var loc = {};

const PrivateRoute = (privateRoutesProps, { children }) => {
  loc = useLocation();
  const { isLoggedIn, component: Component } = privateRoutesProps;
  const params = useParams();

  return isLoggedIn ? <Component params={params} /> : <Navigate to="/login" />;
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          name: user.name,
          _id: user._id,
        })
      );

      // this.props.dispatch(fetchFriends());
    }
  }

  render() {
    const { posts, auth } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Home posts={posts} isLoggedIn={auth.isLoggedIn} />}
            />
            {auth.isLoggedIn ? (
              <Route
                path="/login"
                element={<Navigate to={loc.pathname ? loc.pathname : '/'} />}
              />
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
            <Route
              path="/users/:userId"
              element={
                <PrivateRoute
                  isLoggedIn={auth.isLoggedIn}
                  component={UserProfile}
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
    friends: state.friends,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
