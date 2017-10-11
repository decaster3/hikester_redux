import React, { Component } from 'react'

class EventSearchingResultComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      var event = this.props.event
      return (
        <div>
          Event:
          <p>name <span>{event.name}</span></p>
          <p>cost <span>{event.cost}</span></p>
          <p>address <span>{event.address}</span></p>
          <p>tag <span>{event.tag}</span></p>
          {this.props.eventButton}
        </div>)
  }
}

export default EventSearchingResultComponent
