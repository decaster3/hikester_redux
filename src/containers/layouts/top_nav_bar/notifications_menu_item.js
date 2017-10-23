import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'
import UIkit from 'uikit';

class NotificationsMenuItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="menu-item dropdown dropdown-notifications">
        <div className="dropdown-title">
          <FontAwesome name="bell" className="mr-2"/>
          ({this.props.count})
        </div>
        <div className="dropdown-content">
          <ul>
            <li className="notification-event-item">
              Event name
            </li>
            <li className="notification-event-item">
              Event name
            </li>
            <li className="notification-event-item">
              Event name
            </li>
            <li className="notification-event-item">
              Event name
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default NotificationsMenuItem;
