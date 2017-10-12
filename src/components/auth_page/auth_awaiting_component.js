import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'

export default class AuthAwaitingComponent extends Component {
  render(){
    const Loading = require('react-loading-animation');
    return (
      <div className="facebookSignin">
        <div id="ivisible_recaptcha"></div>
        <Loading />
      </div>
    )
	}
}
