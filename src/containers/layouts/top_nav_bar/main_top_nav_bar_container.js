import React from 'react';
import NavigationBarProfileContainer from './navigation_bar_profile_container'
import { connect } from 'react-redux';
import NotificationsMenuItem from './notifications_menu_item';
import { Link } from 'react-router-dom'

class MainTopNavigationBarContainer extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    var notCount = 0;
    switch (this.props.user.currently) {
      case "SIGNED_IN":
      if (this.props.user.notifications != undefined){
        if (this.props.user.notifications.new != undefined) {
          notCount = Object.keys(this.props.user.notifications.new).length;
        }
      }
      return (
        <header
          id="header">
          <div className="container d-flex align-items-stretch justify-content-end">
            <div className="left mr-auto d-flex align-items-stretch">
              <Link to="/" className="logo">
                <img src="/assets/images/hikester_logo_white.png" className="logo-image"/>
              </Link>
              <Link to = "/support" className="menu-item">
                  Support
              </Link>
              <Link to = "/about" className="menu-item">
                  About
              </Link>
            </div>
            <NotificationsMenuItem count={notCount} />
            <NavigationBarProfileContainer />
          </div>
        </header>
      );
      default:
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
}

function mapStateToProps(state){
    return {
      user: state.user
    }
}


export default connect(mapStateToProps)(MainTopNavigationBarContainer)
