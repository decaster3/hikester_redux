import React, { Component } from 'react'
import NotificationsContainer from '../../../containers/profile/notifications/notifications_container'
export default class MainNotificationPageComponent extends Component {
  render(){
    return(
      <div className="container mt-5">
        <div className="panel">
          <div className="title">
            Notifications
          </div>
          <NotificationsContainer />
        </div>
      </div>
    )
  }
}
