import React, { Component } from 'react'
export default class EventNotificationComponent extends Component {
  render(){
    let p = this.props
    return(
      <div className="notification-event">
        <a href="#">
          <div className="notification-name">
            {p.notification.name}
          </div>
        </a>
        <div className="notification-info">
          <span className="notification-info-name">Address:</span>
          {p.notification.address}
        </div>
        <div className="notification-info">
          <span className="notification-info-name">Cost:</span>
          {p.notification.cost}
        </div>
        <button className="button button-fluid">Join</button>
      </div>
    )
  }
}
