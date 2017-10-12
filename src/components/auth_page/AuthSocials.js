import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class AuthSocials extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="auth-socials">
        <div onClick={this.props.p.facebookSignin} className="auth-socials-item facebook button button-fluid">
          <div className="auth-socials-item-icon">
            <FontAwesome name="facebook" />
          </div>
          <div className="auth-socials-item-name">
            Sign In with Facebook
          </div>
        </div>
        <div onClick={this.props.p.googleSignin} className="auth-socials-item google button button-fluid">
          <div className="auth-socials-item-icon">
            <FontAwesome name="google" />
          </div>
          <div className="auth-socials-item-name">
            Sign In with Google
          </div>
        </div>
      </div>
    );
  }

}
