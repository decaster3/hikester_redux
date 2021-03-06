import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions/auth/authentication_actions'
class NavigationBarProfileContainer extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
  }

  render(){
    let p = this.props
    let user = p.user
    const Loading = require('react-loading-animation');
    switch (user.currently) {
      case "SIGNED_IN":
        return(
          <div className="menu-item dropdown">
            <div className="dropdown-title">
              <Link to = "/profile">
                <img src={user.photoUrl} className="dropdown-photo imgAvatar" />
              </Link>
            </div>
            <div className="dropdown-content">
              <ul>
                <Link to = "/profile">
                  <li className="dropdown-item">{user.username}</li>
                </Link>
                <li className="divider"></li>
                <Link to = "/profile/notifications">
                  <li className="dropdown-item">Notifications</li>
                </Link>
                <li className="divider"></li>
                <Link to = "/profile">
                  <li className="dropdown-item">Settings</li>
                </Link>
                <li className="dropdown-item" onClick = {() => p.logoutUser()}>Sign Out</li>
              </ul>
            </div>
          </div>
        )
      case "ANONYMOUS":
      return (
        <div className="d-flex">
          <Link to = "/auth" className="menu-item">
            Sign in
          </Link>
          <Link to = "/auth" className="menu-item">
            Sign up
          </Link>
        </div>
      )
      default:
      return (
        <div>
          <Loading />
        </div>
      )
    }
  }
}
function mapStateToProps(state){
  return{
    user: state.user
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    logoutUser: logoutUser
  },
  dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarProfileContainer)
