import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordSignin, passwordSignup, googleSignin, facebookSignin, logoutUser } from '../../actions/auth/authentication_actions';
import PhoneVerificationContainer from './phone_verification_container'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import  AuthAwaitingComponent from '../../components/auth_page/auth_awaiting_component'
import  AuthAnonymousComponent from '../../components/auth_page/auth_anonymous_component'
let C = require("../../constants/auth/authentication.js")

class AuthContainer extends Component {
  constructor(props){
    super(props)

    }

  render(){
		let p = this.props
    let user = p.user
    let s = this.state
		switch(user.currently){
			case C.SIGNED_IN: return (
				<div className="userpanel">
          <div id="ivisible_recaptcha"></div>
					<span>Logged in as {user.email}.</span>
          <span>Email {String(user.emailVerified)}</span>
          <span> Phone {String(user.phoneVerified)}</span>
          <PhoneVerificationContainer />
          {' '}<button onClick={p.logoutUser}>Log out</button>
				</div>
			);
			case C.AWAITING:
        return (
				  <AuthAwaitingComponent />
			  );
			default: return (
        <AuthAnonymousComponent
          facebookSignin = {p.facebookSignin}
          googleSignin = {p.googleSignin}
          passwordSignup = {p.passwordSignup}
          passwordSignin = {p.passwordSignin}/>
			);
		}
	}
}

function mapStateToProps(state){
    return {
      user: state.user
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      passwordSignin: passwordSignin,
      passwordSignup: passwordSignup,
      googleSignin: googleSignin,
      facebookSignin: facebookSignin,
      logoutUser: logoutUser
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
