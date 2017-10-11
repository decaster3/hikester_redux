import React, { Component } from 'react'
import ChatContainer from '../../../containers/chat/chat'

class EventDeteail extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let s = this.state
    let p = this.props
    let match = p.match

    return (
      <div>
        <ChatContainer eventId={match.params.id}/>
      </div>
    )
  }
}

export default (EventDeteail)
