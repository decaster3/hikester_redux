import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendVerificationCode, afterSendVerifeingCode } from '../../actions/auth/phone_actions'
import { bindActionCreators } from 'redux';
import * as firebase from 'firebase';

import PhoneExistComponent from '../../components/phone/phone_exist_component'
import PhoneNotExistComponent from '../../components/phone/phone_not_exist_component'
import WaitingVerificationCodeComponent from '../../components/phone/waiting_verification_code_component'

let P = require("../../constants/auth/phone.js")

class PhoneVerificationContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      appVerifier: undefined,
      phoneNumber: '',
      verificationCode: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    this.setState({
      appVerifier: new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {'size': 'invisible'} )
    })
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let p = this.props
    let phone = p.phone
    let s = this.state
    switch(phone.currently) {
        case P.PHONE_EXIST: return (
          <div>
            <div id="invisible-recaptcha"></div>
            <PhoneExistComponent
              appVerifier = {s.appVerifier}
              phoneNumber = {phone.phoneNumber}/>
          </div>
        )
        case P.WAITING_VERIFICATION_CODE: return (
          <div>
            <div id="invisible-recaptcha"></div>
            <WaitingVerificationCodeComponent
              appVerifier = {s.appVerifier}
              forSettings={p.forSettings}
              afterSendVerifeingCode = {p.afterSendVerifeingCode}/>
          </div>
      )
        default: return (
          <div>
            <div id="invisible-recaptcha"></div>
            <PhoneNotExistComponent
              appVerifier = {s.appVerifier}
              forSettings={p.forSettings}
              sendVerificationCode = {p.sendVerificationCode}/>
          </div>
      )
      }
  }
}

function mapStateToProps(state){
    return {
      phone: state.phone
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      afterSendVerifeingCode: afterSendVerifeingCode,
      sendVerificationCode: sendVerificationCode,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationContainer)
