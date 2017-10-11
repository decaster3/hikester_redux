import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const firebase = require("firebase")
require("firebase/firestore")
import PropTypes from 'prop-types';
import { sendMessage, loadMessages } from '../../actions/chat/chat_actions'
import ChatComponent from '../../components/chat/chat_component'


class ChatContainer extends Component {

  constructor(props){
    super(props)

  }

  componentDidMount() {
    this.props.loadMessages(this.props.eventId)
  }


  render() {
    return(
      <ChatComponent messages={this.props.messages} submit={this.props.sendMessage}/>
    )
  }
}

function mapStateToProps(state){
    return {
      messages: state.chat.messages
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      sendMessage: sendMessage,
      loadMessages: loadMessages
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
