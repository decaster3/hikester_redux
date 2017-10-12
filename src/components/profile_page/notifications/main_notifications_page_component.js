import React, { Component } from 'react'
import NotificationsContainer from '../../../containers/profile/notifications/notifications_container'
export default class MainNotificationPageComponent extends Component {
  render(){
    return(
      <div className="container d-flex flex-column justify-content-center align-items-stretch">
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
