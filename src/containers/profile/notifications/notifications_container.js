import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fromRelevantToOld, fromIdToEvent } from '../../../actions/notifications/notifications_actions'

class NotificationsContainer extends Component {

  componentDidMount(){
    let p = this.props
    if (this.props.user.currently != "ANONYMOUS"){
      console.log(1);
      fromRelevantToOld()
      var notifications = p.user.notifications.old
      Object.keys(notifications).map((key) =>{
        console.log(notifications[key]);
        p.fromIdToEvent(notifications[key])
      })
    }
    else (
      this.componentDidMount()
    )
  }
//   container = p.notifications.notifications.map((not, index) => {
//   return (
//   <div key = {index}>
//     Event <br />
//     <p>address: {not.address}</p>
//     <p>cost: {not.cost}</p>
//     <p>end_time: {not.end_time}</p>
//     <p>start_time: {not.start_time}</p>
//     <p>description: {not.description}</p>
//     <p>lat: {not.lat}</p>
//     <p>lng: {not.lng}</p>
//     <p>name: {not.name}</p>
//     <p>max_people_count: {not.max_people_count}</p>
//     <p>start_date: {not.start_datee}</p>
//     <p>tag: {not.tag}</p>
//   </div>)
// })

  render(){
    // let p = this.props
      return(
        <div>
          hey
        </div>
      )
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
      fromIdToEvent: fromIdToEvent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
