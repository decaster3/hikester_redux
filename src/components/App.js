import React, { Component } from 'react'
import MainAuthComponent from './auth_page/main_auth_component'
import MainProfileComponent from './profile_page/main_profile_component'
import { Link } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Link to = "/profile">Профиль</Link>
        <Link to = "/auth">Аутенитификация</Link>
      </div>
    );
  }
}
