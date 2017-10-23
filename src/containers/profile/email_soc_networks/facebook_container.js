import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { linkFacebook, unlinkFacebook } from '../../../actions/profile/profile_settings_action'

class FacebookContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let C = require('../../../constants/profile/profile')
    let p = this.props
    let s = this.state
    const Loading = require('react-loading-animation');
    let user = p.user
    if (user.currently != "ANONYMOUS"){
    var authProviders = []
    for (var i = 0; i < user.authProviders.length; i++){
      authProviders.push(user.authProviders[i].providerId)
    }
    switch (p.profile_settings.changing) {
      case C.LOADING_LINKING:
        return(
          <div>
            We are waiting for a response from a third-party service
            <Loading />
          </div>
        )
      default:
      if (authProviders.includes("facebook.com") && authProviders.includes("phone") && authProviders.length == 2
      || authProviders.includes("facebook.com") && authProviders.length == 1){
        return (
          <div>
            Facebook is your only way to go into the app to remove it, add any other
          </div>
        )
      }
        else {
          if (authProviders.includes("facebook.com")){
            return(
              <div>
                <button className="button facebook" onClick = {() => {p.unlinkFacebook()}}>Unlink Facevook</button>
              </div>
            )
          }
          else {
            return(
              <div>
                <button className="button facebook" onClick = {() => {p.linkFacebook()}}>Link Facebook</button>
              </div>
            )
          }
        }
    } }
  }
}
function mapStateToProps(state){
  return{
    profile_settings: state.profile_settings,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  let C = require('../../../constants/profile/profile')
  return bindActionCreators(
    {
      linkFacebook: linkFacebook,
      unlinkFacebook: unlinkFacebook
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookContainer)
