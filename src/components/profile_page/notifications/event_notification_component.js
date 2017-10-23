import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class EventNotificationComponent extends Component {
  render(){
    let p = this.props
    console.log(p.notification);
    return(
      <div className="notification-event">
        <a href="#">
          <div className="notification-name">
            {p.notification.name}
          </div>
        </a>
        <div className="divider"></div>
        <img src="/assets/images/questroom.jpg" />
        <div className="divider"></div>
        <div className="notification-info">
          <span className="notification-info-name">Address:</span>
          {p.notification.address}
        </div>
        <div className="notification-info">
          <span className="notification-info-name">Cost:</span>
          {p.notification.cost}
        </div>
        <div className="notification-info">
          <span className="notification-info-name">Decription:</span>
          {p.notification.description}
        </div>
        <Link to = {"/event/" + p.notification.id}>
          <button className="button button-fluid mt-3">Details</button>
        </Link>
      </div>
    )
  }
}
