import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { changeEmail, verifyEmail } from '../../../actions/profile/profile_settings_action'
import ReauthenticationContainerForChangingEmail from './reauthentication_container_for_changing_email.js'

class EmailContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      newEmail:''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let C = require('../../../constants/profile/profile')
    let p = this.props
    let s = this.state
    let user = p.user
    switch (p.profile_settings.changing) {
      case C.LOADING_REAUTHENTICATION:
      // кейс когда пользователь пытается реаутифицироваться с фейса или гугла
        return(<div>confirm your account, for change email</div>)
      case C.REAUTHENTICATE_USER_FOR_CHANGE_EMAIL:
      // кейс когда пользователю предложено ввести пароль или фейс, чтобы сменять почту
        return(<ReauthenticationContainerForChangingEmail newEmail = {s.newEmail} />)
      case C.CHANGING_EMAIL:
      //после нажатию на кнопку сменить почту
        return(
          <div className="input-group">
            <input className="input-text form-control" name = "newEmail" type = "newEmail" defaultValue = {s.newEmail} onChange = {this.handleChange} placeholder="New Email"/>
            <span className="input-group-btn">
              <button className="btn button" onClick = {() => p.changeEmail(s.newEmail)}>Save</button>
              <button className="btn button" onClick = {() => p.exitEditMode()}>Cancel</button>
            </span>
          </div>
        )
      default:
        switch (user.emailVerified) {
          case true:
          return(
            <div>
              {p.user.email}
              <button onClick = {() => p.editMode()}>Change</button>
            </div>
          )
          default:
          return(
            <div>
              Your email is not verified
              {user.email}
              <button onClick = {() => p.verifyEmail()}>Verify</button>
              <button onClick = {() => p.editMode()}>Change email</button>
            </div>
          )
        }
    }

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
      exitEditMode: () => {return function(dispatch){
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      } },
      editMode: () => {return function(dispatch){
        dispatch({type: C.FIELD_CHANGING, changing: C.CHANGING_EMAIL})
      } },
      changeEmail: changeEmail,
      verifyEmail: verifyEmail
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer)
