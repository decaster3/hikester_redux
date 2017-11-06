import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainSettingsComponent from '../settings/main_settings_component';
import { Link } from 'react-router-dom';
import ProfileAboutComponent from './profile_about_component';
import ProfileEventsComponent from './profile_events_component';
import MainSettingsContainer from '../../../containers/profile/main_settings_container'
import Uploader from '../../../components/file_loader/file_uploader_component';
import { verifyEmail, setMyEvents } from '../../../actions/profile/profile_settings_action';
import FontAwesome from 'react-fontawesome';
const firebase = require("firebase");

class MainProfilePageComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      emailVerificationView: true,
      events: []
    }
    this.changeEmailVerificationView = this.changeEmailVerificationView.bind(this)
  }
  changeEmailVerificationView(){
    var a = !this.state.emailVerificationView
    this.setState({
      emailVerificationView: a
    })
  }

  render(){
    const Loading = require('react-loading-animation');
    let p = this.props
    let s = this.state
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

      var email =
      (<div>
        {
          s.emailVerificationView?
            ( <div className="profile-notification text-center mt-3">
              Please, confirm your email to open the opportunity of creating events.
              <div className="profile-confirm-link-block mt-3">
                <button onClick = {() => {this.props.verifyEmail();this.changeEmailVerificationView()}}>
                  Confirm Email
                </button>
              </div>
            </div>)
          :
          (<div className="profile-notification text-center mt-3">
            Email was sent, check your mail!
          </div>)
        }
      </div>)
      if (p.user.emailVerified){
        email = ""
      }
      // var emailShort = "Email not confirmed"
      var emailShort = '';
      if (p.user.emailVerified){
        emailShort = <FontAwesome name="envelope" size="2x"/>
      }
      // var phone = 'phone not verified'
      var phone = '';
      if (p.user.phoneVerified){
        phone = <FontAwesome name="phone-square" size="2x"/>
      }

      return (
  <div id="profile-section" className="page-section container justify-content-center">
      {email}
    <div className="divider gradient"></div>
    <div className="profile-main row">
      <div className="col-3 profile-info-wrapper">
        <div className="profile-info panel">
          <div className="profile-info-photo-wrapper">
            <img src={p.user.photoUrl} className="profile-info-photo" />
            <div className="avatar-overlay">
              <Uploader storagePath={"/avatar/"} callback={this.props.changeAvatar} filename={p.user.uid}/>
            </div>
          </div>
          <div className="divider"></div>

          <div className="profile-info-name">
            {p.user.username}
          </div>
          <div className="divider"></div>
          <div className="profile-info-user-from">
            Hikester from 20.09.2017
          </div>
        </div>

        <div className="profile-info panel">
          <div className="title">
            Verification
            <span style={{float: 'right'}}>{p.user.verificationProcent}%</span>
          </div>
          <div className="mt-3 verified-items">
            {emailShort}
            {phone}
          </div>
          <div className="mt-2 profile-info-user-from">
            {anotherAuthProvidersView != ''?
              <div>Social networks: {anotherAuthProvidersView}</div>
              :
              <div className="mt-3 mb-0 alert alert-warning" role="alert">
                Social networks not verified!
              </div>
            }

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
            <ProfileEventsComponent/>
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
        <Loading />
      </div>)
    }
  }
}
function mapStateToProps(state){
    return {
      user: state.user
    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      setMyEvents: setMyEvents,
      verifyEmail: verifyEmail
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MainProfilePageComponent);
