import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    console.log('posts from app', posts);
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
