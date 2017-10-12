import React, { Component } from 'react'
import { connect } from 'react-redux'
import MainSettingsComponent from '../settings/main_settings_component'
import { Link } from 'react-router-dom'
import ProfileAboutComponent from './profile_about_component'
import MainSettingsContainer from '../../../containers/profile/main_settings_container'

class MainProfilePageComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    if (p.user.currently == "SIGNED_IN"){
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

      var email = (
        <div className="profile-notification text-center mt-3">
          Please, confirm your email to open the opportunity of creating events.
          <div className="profile-confirm-link-block mt-3">
            <a href="#" className="profile-confirm-link">
              Confirm Email
            </a>
          </div>
        </div>
      )
      if (p.user.emailVerified){
        email = ""
      }
      var emailShort = "Email not confirmed"
      if (p.user.emailVerified){
        emailShort = "Email verified"
      }
      var phone = 'phone not verified'
      if (p.user.phoneVerified){
        phone = "Phone verified"
      }

      return (
  <div id="profile-section" className="page-section container justify-content-center">
      {email}
    <div className="divider gradient"></div>
    <div className="profile-main row">
      <div className="col-3 profile-info-wrapper">
        <div className="profile-info panel">
          <img src={p.user.photoUrl} className="profile-info-photo" />
          <div className="divider"></div>
          <div className="profile-info-name">
            {p.user.username}
            <div className="divider"></div>
            {emailShort}
            <div className="divider"></div>
            {phone}
          </div>
          <div className="divider"></div>
          <div className="profile-info-user-from">
            Hikester from 20.09.2017
          </div>
          <div className="divider"></div>
          <div className="profile-info-user-from">
            Also has verified {anotherAuthProvidersView}
          </div>
        </div>
      </div>
      <div className="col-9">
        <ul className="tabs nav nav-tabs profile-tabs" role="tablist">
          <li className="nav-item col px-0">
            <a className="nav-link active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-expanded="true">About</a>
          </li>
          <li className="nav-item col px-0">
            <a className="nav-link" id="events-tab" data-toggle="tab" href="#events" role="tab" aria-controls="events">Events</a>
          </li>
          <li className="nav-item col px-0">
            <a className="nav-link" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings">Settings</a>
          </li>
        </ul>
        <div className="tab-content panel" id="profile-tab-content">
          <div className="tab-pane fade show active" id="about" role="tabpanel" aria-labelledby="about-tab">
            <ProfileAboutComponent user={p.user} />
          </div>
          <div className="tab-pane fade" id="events" role="tabpanel" aria-labelledby="events-tab">
            123
          </div>
          <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
             <MainSettingsContainer />
          </div>
        </div>
      </div>
    </div>
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
