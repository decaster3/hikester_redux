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
        // button = (
        //   <div>
        //     You already attend on this event
        //   </div>)
        button = ( <button className="button button-fluid disabled">You have joined this event</button> )
      else
        button = ( <button className="button button-fluid" onClick = {() => p.onclick(eventId)}>Join event</button> )
    } else
      button = <div className="mt-3 mb-0 alert alert-warning" role="alert">You need to sign in to join the event</div>

    return ( <div>{button}</div>)
  }
}

export default EventSearchingResultButtonComponent
