import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'

export default class AuthAwaitingComponent extends Component {
  render(){
    return (
      <div className="facebookSignin">
        <div id="ivisible_recaptcha"></div>
        WAIT
      </div>
    )
	}
}
