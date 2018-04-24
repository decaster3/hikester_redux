import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { sendMessage, loadMessages } from '../../../actions/chat/chat_actions'
import ChatComponent from '../../../components/event_page/chat/chat_component'
import CantSeeChatComponent from '../../../components/event_page/chat/chat_component'


class ChatContainer extends Component {

  constructor(props){
    super(props)

  }

  componentDidMount() {
    this.props.loadMessages()
    // isUserInChat(this.props.eventId)
  }


  render() {
    let C = require("../../../constants/chat/chat.js")
    const Loading = require('react-loading-animation');
    switch (this.props.state) {
      case C.LOADED:
        return(
          <ChatComponent user={this.props.user} eventId={this.props.eventId} photoURL={this.props.photoURL} username={this.props.username} messages={this.props.messages} submit={this.props.sendMessage}/>
        )
      case C.LOADING:
        return(
          <Loading />
        )
      case C.NOT_LOADED:
        return(
          <p>CHAT NOT LOADED!</p>
        )
      default:
        return(
          <p>CHAT ERROR!</p>
        )
    }
  }
}

function mapStateToProps(state){
    return {
      messages: state.chat.messages,
      username: state.user.username,
      photoURL: state.user.photoUrl || "/assets/images/default_user_image.png",
      state: state.chat.state
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
