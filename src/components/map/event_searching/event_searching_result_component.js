import React, { Component } from 'react'

class EventSearchingResultComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      var event = this.props.event
      return (
        <div className="col-4 event-item">
          <div className="event-item-description">
            <div className="event-item-name text-center">
              {event.name}
            </div>
          </div>
        {this.props.eventButton}
      </div>)
  }
}

export default EventSearchingResultComponent
