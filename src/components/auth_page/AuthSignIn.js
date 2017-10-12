import React from 'react';
import FontAwesome from 'react-fontawesome';
import AuthSocials from './AuthSocials';

export default class AuthSignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      emailSignin: '',
      passSignin: '',
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
      <div id="sign-in-section" className="container-fluid px-0">
        <div className="title">
          Sign In
        </div>
        <AuthSocials p={p}/>
        <div className="divider"></div>
        <div className="auth-field">
          <input type="text" name="emailSignin" onChange={this.handleChange} value={s.emailSignin} className="input-text" placeholder="Email"/>
        </div>
        <div className="auth-field">
          <input type="password" name="passSignin" onChange={this.handleChange} value={s.passSignin} className="input-text" placeholder="Password"/>
        </div>
        <div className="auth-actions">
          <button onClick = {() => this.props.p.passwordSignin(s.emailSignin, s.passSignin)} className="button button-auth">
            Sign In
          </button>
          <a href="#" onClick={this.props.change_state}>
            Sign Up
          </a>
        </div>
      </div>
    );
  }

}
