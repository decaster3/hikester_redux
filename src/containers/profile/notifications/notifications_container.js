import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getNotifications, fromIdToEvent } from '../../../actions/notifications/notifications_actions'

import  EventNotificationComponent from '../../../components/profile_page/notifications/event_notification_component'
import  NoNotificationComponent from '../../../components/profile_page/notifications/no_notification_component'
import  LoadingNotificationComponent from '../../../components/profile_page/notifications/loading_notification_component'

class NotificationsContainer extends Component {

  componentDidMount(){
    this.props.getNotifications()
  }
  render(){
      let p = this.props
      var view = {}
      switch (p.user.currently) {
        case "SIGNED_IN":
        switch (p.notifications.currently) {
          case "LOADING":
          return(
            <div>
              <LoadingNotificationComponent />
            </div>
          )
          case "LOADED":
              if(p.notifications.notifications.length > 0){
                view = p.notifications.notifications.map((not, index) => {
                  return(
                  <div key = {index}>
                    <EventNotificationComponent notification = {not}/>
                  </div>)
                })
                return(
                  <div>
                    {view}
                  </div>
                )
              }
            else {
              return(
                <div>
                  <NoNotificationComponent />
                </div>)
            }
          default:
            <div>
              ERROR WHILE LOADING
            </div>

        }
        default:
          return(
            <div>
              <LoadingNotificationComponent />
            </div>
          )
      }
    }
}
function mapStateToProps(state){
  return{
    user: state.user,
    notifications: state.notifications
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      getNotifications: getNotifications
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
