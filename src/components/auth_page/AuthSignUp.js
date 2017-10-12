import React from 'react';
import FontAwesome from 'react-fontawesome';
import AuthSocials from './AuthSocials';

export default class AuthSignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailSignup: '',
      passSignup: '',
      passConfirmSignup: '',
      firstNameSignup: '',
      lastNameSignup: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    let s = this.state;
    let p = this.props.p;
    return (
      <div id="sign-up-section" className="container-fluid px-0">
        <div className="title">
          Sign Up
        </div>
        <AuthSocials p={p} />
        <div className="divider"></div>
        <div className="auth-field">
          <input type="text" name="emailSignup" onChange={this.handleChange} value={s.emailSignup} className="input-text" placeholder="Email"/>
        </div>
        <div className="auth-field">
          <input type="text" name="firstNameSignup" onChange={this.handleChange} value={s.firstNameSignup} className="input-text" placeholder="First Name"/>
        </div>
        <div className="auth-field">
          <input type="text" name="lastNameSignup" onChange={this.handleChange} value={s.lastNameSignup} className="input-text" placeholder="Last Name"/>
        </div>
        <div className="divider"></div>
        <div className="auth-field">
          <input type="password" name="passSignup" onChange={this.handleChange} value={s.passSignup} className="input-text" placeholder="Password"/>
        </div>
        <div className="auth-field">
          <input type="password" name="passConfirmSignup" onChange={this.handleChange} value={s.passConfirmSignup} className="input-text" placeholder="Confirm Password"/>
        </div>
        <div className="auth-actions">
          <button onClick = {() => p.passwordSignup(s.emailSignup,s.firstNameSignup,s.lastNameSignup, s.passSignup)} className="button button-auth">
            Sign Up
          </button>
          <a href="#" onClick={this.props.change_state}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

}
