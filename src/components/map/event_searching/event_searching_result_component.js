import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EventSearchingResultComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
      var event = this.props.event
      return (
        <div className="col-12 event-item">
          <div className="event-item-description col-12">
            <div className="event-item-name">
              {event.name}
            </div>
            <div className="event-item-description">
              {event.description}
            </div>
          </div>
        {this.props.eventButton}
        <Link to={"/event/" + event.id}>More info</Link>
      </div>)
  }
}

export default EventSearchingResultComponent
