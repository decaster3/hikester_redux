import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getNotifications, fromIdToEvent } from '../../../actions/notifications/notifications_actions'

class NotificationsContainer extends Component {

  componentDidMount(){
    this.props.getNotifications()
  }
  render(){
      let p = this.props
      var view = {}
      if (p.user.currently != "ANONYMOUS"){
        if(p.notifications.notifications.length > 0){
          console.log(123);
          view = p.notifications.notifications.map((not, index) => {
            return(<div key = {index}>
              {not.name}
            </div>)
          })
        console.log(view);
        return(
          <div>
          {view}
        </div>
        )
        }
        else {
          return(<div>
            You havent got notifications
          </div>)
        }
      }
      else {
        return(
          <div>
            LOADING
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
