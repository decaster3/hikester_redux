import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainSettingsComponent from '../settings/main_settings_component'
import { Link } from 'react-router-dom'

class MainProfilePageComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    if (p.user.currently != "ANONYMOUS"){

      var authProviders = []
      for (var i = 0; i < p.user.authProviders.length; i++){
        if (p.user.authProviders[i].providerId != "password" && p.user.authProviders[i].providerId != "phone")
          authProviders.push(p.user.authProviders[i].providerId)
      }
      var anotherAuthProvidersView = authProviders.map((provider, index) => {
        return (
          <div key = {index}>
            {provider}
          </div>
        )
      })

      var email = 'email not verified'
      if (p.user.emailVerified){
        email = "email verified"
      }

      var phone = 'phone not verified'
      if (p.user.phoneVerified){
        phone = "phone verified"
      }
      return (
        <div>
          user verification procent is {p.user.verificationProcent}<br />
          {p.user.username}<br />
          Country:{p.user.default_country}<br />
          City:{p.user.default_city}<br />
          {email}<br />
          {phone}<br />
          Also has {anotherAuthProvidersView}<br />
        <Link to = 'profile/edit'> Edit profile </Link>
        <Link to = 'profile/notifications'> Notifications </Link>
        </div>
      )}
    else {
      return (
      <div>
        Loading...
      </div>)
    }
  }
}
function mapStateToProps(state){
    return {
      user: state.user
    }
}
export default connect(mapStateToProps)(MainProfilePageComponent);
