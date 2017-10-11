import React, { Component } from 'react'
export default class EventNotificationComponent extends Component {
  render(){
    let p = this.props
    return(
      <div>
         {p.notification.name}
         {p.notification.address}
         {p.notification.cost}
      </div>
    )
  }
}
