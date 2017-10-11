import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'
import * as firebase from 'firebase';

export default class PhoneNotExistComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      appVerifier: undefined,
      phoneNumber: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      appVerifier: new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {'size': 'invisible'} )
    })
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let p = this.props
    let s = this.state
    return (
      <div>
        <div id="invisible-recaptcha"></div>
        <br />Enter phone number<br />
        <label>
          Phone number:
          <input name="phoneNumber" type = "text" defaultValue = {s.phoneNumber} onChange = {this.handleChange}/>
          <button onClick = {() => { p.sendVerificationCode(s.phoneNumber, s.appVerifier) }}> Send verification code</button>
        </label>
      </div>
    )
	}
}
