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
          <div>
            <ChatComponent messages={this.props.messages} submit={this.props.sendMessage}/>
          </div>
        )
      case C.LOADING:
        return(
          <p>LOADING</p>
        )
      case C.NOT_LOADED:
        return(
          <p>NOT LOADED YET</p>
        )
      default:
        return(
          <p>ERROR!</p>
        )
    }
  }
}

function mapStateToProps(state){
    return {
      messages: state.chat.messages,
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
