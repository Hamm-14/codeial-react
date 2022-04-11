import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import PostsList from './PostsList';
import Navbar from './Navbar';

const Home = () => <div>Home</div>;

const Login = () => <div>Login</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
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
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
