import React from 'react';
import NavigationBarProfileContainer from './navigation_bar_profile_container'
export default class MainTopNavigationBarComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
      <header
        id="header">
        <div className="container d-flex align-items-stretch justify-content-end">
          <div className="left mr-auto d-flex align-items-stretch">
            <a href="/" className="logo">
              <img src="/assets/images/hikester_logo_white.png" className="logo-image"/>
            </a>
            <div className="menu-item">
              Support
            </div>
            <div className="menu-item">
              About
            </div>
          </div>
          <NavigationBarProfileContainer />
        </div>
      </header>
    );
  }
}
