import React, { Component } from 'react';
import AuthContainer from '../../containers/auth/authenticate_container'

export default class AuthAnonymousComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      emailSignup: '',
      passSignup: '',
      emailSignin: '',
      passSignin: '',
      nameSignup: '',
      lastNameSignup: ''
    }
    this.handleChange = this.handleChange.bind(this);
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
    let user = p.user
    let s = this.state
    return (
      <div>
        <div id="ivisible_recaptcha"></div>
        <div className="facebookSignin">
          <button onClick={p.facebookSignin}>Log in with facebook</button>
        </div>

        <div className="googleSignin">
          <button onClick={p.googleSignin}>Log in with google</button>
        </div>

            PASSWORD SIGNUP<br />
            <label>
              Email:
              <input name="emailSignup" type = "text" defaultValue = {s.emailSignup} onChange = {this.handleChange}/>
            </label>
            <label>
              Passwprd:
              <input name = "passSignup" type = "password" defaultValue = {s.passSignup} onChange = {this.handleChange}/>
            </label>
            <label>
              Name:
              <input name = "nameSignup" type = "nameSignup" defaultValue = {s.nameSignup} onChange = {this.handleChange}/>
            </label>
            <label>
              Last name:
              <input name = "lastNameSignup" type = "lastNameSignup" defaultValue = {s.lastNameSignup} onChange = {this.handleChange}/>
            </label>
            <button onClick = {() => p.passwordSignup(s.emailSignup,s.nameSignup,s.lastNameSignup, s.passSignup)}>SIGN UP</button>

            <br />PASSWORD SIGNIN<br />
            <label>
              Email:
              <input name="emailSignin" type = "text" defaultValue = {s.emailSignin} onChange = {this.handleChange}/>
            </label>
            <label>
              Passwprd:
              <input name = "passSignin" type = "password" defaultValue = {s.passSignin} onChange = {this.handleChange}/>
            </label>
            <button onClick = {() => p.passwordSignin(s.emailSignin, s.passSignin)}>SIGN IN</button>
      </div>
    )
	}
}
