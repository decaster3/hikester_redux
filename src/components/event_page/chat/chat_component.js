import React, { Component } from 'react';
import moment from 'moment';
import Message from './message';
import { Nav, NavItem } from 'react-bootstrap';
import axios from 'axios';
// import * as firebase from 'firebase';
// require("firebase/firestore");

const firebase = require("firebase")
require("firebase/firestore")
//
// var config = {
//     apiKey: "AIzaSyAliYBadbVCrUv7Y-WMu--BmwmL99Ba42I",
//     authDomain: "hikesterrr.firebaseapp.com",
//     databaseURL: "https://hikesterrr.firebaseio.com",
//     projectId: "hikesterrr",
//     storageBucket: "hikesterrr.appspot.com",
//     messagingSenderId: "681168179245"
//   };
//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   } else {
//     firebase.app()
//   }




var messagesRef = {};
class ChatComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      bot_messages: {},
      message: '',
      chat: (messages) => {return(
        <div>
          <div className="message-list">
            {messages}
          </div>
          <div className="chat-form">
            <input type="text" placeholder="Message.." className="chat-form-input" value={this.state.message} onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}/>
            <button className="button chat-form-submit" onClick={this.handleSubmit} >
              Send
            </button>
          </div>
        </div>
    )}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitBot = this.handleSubmitBot.bind(this)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyDownBot = this.handleKeyDownBot.bind(this)

  }

  componentDidMount(){
    var db = firebase.firestore();
    console.log(this.props.eventId)
    console.log(this.props.user.uid)

    messagesRef = db.collection("events").doc(this.props.eventId).collection("users").doc(this.props.user.uid).collection('chat_bot_messages').orderBy("date", "desc");
    messagesRef.onSnapshot(docMessages => {
      console.log(docMessages);
      docMessages.forEach(function(doc) {
        console.log(doc.data());
      });
    });
  }

  handleChange(event) {
   this.setState({message: event.target.value})
  }

  handleSubmit() {
    this.props.submit(this.state.message)
    this.setState({message: ''})
  }
  handleSubmitBot() {
    axios.get(`https://localhost:8005/?${this.state.message} ${this.props.eventId} ${this.props.user.uid}`).then((data) => {
      
    });

    this.setState({message: ''})
  }

  handleKeyDown(event) {
    if (event.keyCode == 13)
      this.handleSubmit()
  }

  handleKeyDownBot(event) {
    if (event.keyCode == 13)
      this.handleSubmitBot()
  }

  handleSelect(k) {

    let p = this.props

    if(k == 1){
      this.setState({chat: () => {
        const messages = [...this.props.messages].reverse().map((message, index) => {
          return (
            <Message key={index} photoURL={message.userPhoto} autor={message.autor} text={message.message} active={message.autor == p.username}/>
          )
        });
        return(
        <div>
          <div className="message-list">
            {messages}
          </div>
          <div className="chat-form">
            <input type="text" placeholder="Message.." className="chat-form-input" value={this.state.message} onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}/>
            <button className="button chat-form-submit" onClick={this.handleSubmit} >
              Send
            </button>
          </div>
        </div>
    )}});
  }else{
    this.setState({chat: () => {
      const messages = [...this.state.bot_messages].reverse().map((message, index) => {
        return (
          <Message key={index} photoURL={message.userPhoto} autor={message.autor} text={message.message} active={message.autor == p.username}/>
        )
      });
      return(
      <div>
        <div className="message-list">
          {messages}
        </div>
        <div className="chat-form">
          <input type="text" placeholder="Message.." className="chat-form-input" value={this.state.message} onChange={this.handleChange}
                  onKeyDown={this.handleKeyDownBot}/>
          <button className="button chat-form-submit" onClick={this.handleSubmitBot} >
            Send
          </button>
        </div>
      </div>
  )}});
  }
  }

  render() {
    let p = this.props

    return (
      <div id="chat-section" className="container-fluid d-flex px-0">
        {this.state.chat()}
        <Nav bsStyle="tabs" activeKey="1" onSelect={(k) => this.handleSelect(k)}>
          <NavItem eventKey="1">
            Chat
          </NavItem>
          <NavItem eventKey="2">
            Bot
          </NavItem>
        </Nav>

      </div>

    )
  }
}

export default (ChatComponent)
