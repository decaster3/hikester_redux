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
          <div className="event-item-name text-center">
            <Link to={"/event/" + event.id}>{event.name}</Link>
          </div>
          <div className="event-item-image">
            <img src="/assets/images/questroom.jpg" />
          </div>
          <div className="event-item-description col-12 my-3">
            <div className="event-item-description">
              Address:
              {' ' + event.address}
            </div>
            <div className="event-item-description">
              Cost:
              {' ' + event.cost}
            </div>
            <div className="event-item-description">
              Description:
              {' ' + event.description}
            </div>
          </div>
        {this.props.eventButton}
        <div className="divider"></div>
      </div>)
  }
}

export default EventSearchingResultComponent
