import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { afterSave, changeSex, changeName , changeLocation, changeAbout} from '../../actions/profile/profile_settings_action'
import EmailContainer from './email_soc_networks/email_container'
import FacebookContainer from './email_soc_networks/facebook_container'
import GoogleContainer from './email_soc_networks/google_container'
import PasswordContainer from './email_soc_networks/password_container'
import PhoneContainer from './initials/phone_container'

class MainSettingsContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      country: '',
      city: '',
      about: '',
      sex: 'Male'
    }
    this.handleChange = this.handleChange.bind(this);
    this.saveAll = this.saveAll.bind(this);
    this.sexOnChange = this.sexOnChange.bind(this);
  }
  componentDidMount(){
    this.setState({
      username: this.props.user.username,
      country: this.props.user.default_country,
      city: this.props.user.default_city,
      about: this.props.user.about
    })
  }
  saveAll(){
    let s = this.state
    let p = this.props
    p.changeName(s.username)
    p.changeLocation(s.country, s.city)
    p.changeAbout(s.about)
    p.changeSex(s.sex)
    p.afterSave()
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  sexOnChange(event){
    this.setState({sex: event.target.value});
  }

  render() {
    let p = this.props
    let s = this.state
    let user = p.user
    const Loading = require('react-loading-animation');
    switch (p.user.currently) {
      case "SIGNED_IN":
      return (
        <div className="profile-settings">
          <div className="profile-description-item-list">
            <div className="title">General Information</div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Name
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <input name = "username" type="text" className="input-text" placeholder="Name and Last name" value = {s.username} onChange = {this.handleChange}/>
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Country
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <input name = "country" type="text" className="input-text" placeholder="Country" value = {s.country} onChange = {this.handleChange}/>
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                City
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <input name = "city" type="text" className="input-text" placeholder="City" value = {s.city} onChange = {this.handleChange}/>
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                About
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <textarea name = "about" className="input-text" placeholder="About" value = {s.about} onChange = {this.handleChange}/>
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Sex
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <select onChange={this.sexOnChange} value={this.state.sex}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <button className="button button-fluid mt-3" onClick = {() => this.saveAll()}>Save Settings</button>
            <div className="title mt-3">Change Email and Social Networks</div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Email
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <EmailContainer />
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Facebook
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <FacebookContainer />
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Google
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <GoogleContainer />
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Phone
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <PhoneContainer forSettings={true}/>
              </div>
            </div>
            <div className="profile-description-item row d-flex align-items-center">
              <div className="profile-description-item-name col-3 text-right">
                Password
              </div>
              <div className="profile-description-item-value col-9 text-left">
                <PasswordContainer />
              </div>
            </div>
          </div>
        </div>
      );
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
  return bindActionCreators(
    {
      afterSave: afterSave,
      changeName: changeName,
      changeLocation: changeLocation,
      changeAbout: changeAbout,
      changeSex: changeSex
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSettingsContainer)
