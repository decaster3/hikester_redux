import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
export default class App extends Component {
  render() {
    return (
      <div>
        <ToastContainer />
        <Link to = "/profile">Profile</Link>
        <Link to = "/auth">Authorization</Link>
        <Link to = "/map">Map</Link>
      </div>
    );
  }
}
