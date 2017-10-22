import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class EventSearchingResultButtonComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    var button = null
    let p = this.props
    var eventId = p.eventId;
    if (p.signedIn) {
      if (p.joined)
        button = (
          <div>
            You already attend on this event
          </div>)
      else
        button = ( <button className="button button-fluid" onClick = {() => p.onclick(eventId)}>Join to event</button> )
    } else
      button = <div>For attending to event, you should sign up!</div>

    return ( <div>{button}</div>)
  }
}

export default EventSearchingResultButtonComponent
