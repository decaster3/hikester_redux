import React, { Component } from 'react';
import moment from 'moment';
import Message from './message';

class ChatComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
   this.setState({message: event.target.value})
  }

  handleSubmit() {
    this.props.submit(this.state.message)
    this.setState({message: ''})
  }

  render() {
    let p = this.props

    const messages = p.messages.map((message, index) => {
      return (
        <Message key={index} photoURL={p.photoURL} autor={message.autor} text={message.message} active={message.autor == p.username}/>
      )
    })

    return (
      <div id="chat-section" className="container-fluid d-flex px-0">
        <div className="message-list">
          {messages}
        </div>
        <div className="chat-form">
          <input type="text" placeholder="Message.." className="chat-form-input" value={this.state.message} onChange={this.handleChange} />
          <button className="button chat-form-submit" onClick={this.handleSubmit} >
            Send
          </button>
        </div>
      </div>
    )
  }
}

export default (ChatComponent)
