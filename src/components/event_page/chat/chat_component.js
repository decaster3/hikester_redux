import React, { Component } from 'react'
import moment from 'moment';

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
        <div key = {index}>
          <p>{message.message}</p>
          <p>{message.autor}</p>
          <p> date: {moment(message.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        </div>
      )
    })

    return (
      <div>
        <label>
          Message:
          <input type="text" value={this.state.message} onChange={this.handleChange} />
        </label>
        <input type="submit" onClick={this.handleSubmit} />

        {messages}
      </div>
    )
  }
}

export default (ChatComponent)
