import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { linkGoogle, unlinkGoogle } from '../../../actions/profile/profile_settings_action'

class GoogleContainer extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let C = require('../../../constants/profile/profile')
    let p = this.props
    let s = this.state
    let user = p.user
    const Loading = require('react-loading-animation');
    if (user.currently != "ANONYMOUS"){
    var authProviders = []
    for (var i = 0; i < user.authProviders.length; i++){
      authProviders.push(user.authProviders[i].providerId)
    }
    switch (p.profile_settings.changing) {
      case C.LOADING_LINKING:
        return(
          <div>
            We are waiting for a response from the central service
            <Loading />
          </div>
        )
      default:
      if (authProviders.includes("google.com") && authProviders.includes("phone") && authProviders.length == 2
        || authProviders.includes("google.com") && authProviders.length == 1){
          return (
            <div>
              Google is your only way to go into the app to remove it, add any other
            </div>
          )
        }

      else{
        if (authProviders.includes("google.com")){
          return(
            <div>
              <button className="button google" onClick = {() => {p.unlinkGoogle()}}>Unlink Google</button>
            </div>
          )
        }
        else {
            return(
              <div>
                <button className="button google" onClick = {() => {p.linkGoogle()}}>Link Google</button>
              </div>
            )
          }
      }
    }}
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
      linkGoogle: linkGoogle,
      unlinkGoogle: unlinkGoogle
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleContainer)
