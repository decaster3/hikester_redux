import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { sendMessage, loadMessages } from '../../../actions/chat/chat_actions'
import ChatComponent from '../../../components/event_page/chat/chat_component'


class ChatContainer extends Component {

  constructor(props){
    super(props)

  }

  componentDidMount() {
    this.props.loadMessages()
  }


  render() {
    let C = require("../../../constants/chat/chat.js")
    switch (this.props.state) {
      case C.LOADED:
        return(
          <div className="col-8 px-0">
            <ChatComponent photoURL={this.props.photoURL} username={this.props.username} messages={this.props.messages} submit={this.props.sendMessage}/>
          </div>
        )
      case C.LOADING:
        return(
          <p>CHAT is LOADING</p>
        )
      case C.NOT_LOADED:
        return(
          <p>CHAT NOT LOADED YET</p>
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
