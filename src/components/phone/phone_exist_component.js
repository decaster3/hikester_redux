import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'
import * as firebase from 'firebase';

export default class PhoneExistComponent extends Component {
  componentDidMount(){
    this.setState({
      appVerifier: new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {'size': 'invisible'} )
    })
  }

  render(){
    let p = this.props
    let s = this.state
    return (
      <div>
        <div id="invisible-recaptcha"></div>
        {p.phoneNumber}
      </div>
    )
	}
}
