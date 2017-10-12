import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import EventParticipants from './event_participants'
class EventDeteailComponent extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let event = this.props.event
    let users = event.users
    var participants = []
    users.map((user) => {
      participants.push({
        name: user.userFromDB.username,
        photo: user.userFromDB.photoUrl
      })
    })
    console.log(participants);
    var datestring = event.start_date.getDate()  + "-" + (event.start_date.getMonth()+1) + "-" + event.start_date.getFullYear() + " " +
      event.start_date.getHours() + ":" + event.start_date.getMinutes();
      console.log(datestring);

    return (
      <div id="event-section" className="page-section container-fluid d-flex px-0">
  <div className="col-4 px-0" id="event-info">
    <div className="event-name">{event.name}</div>
    <div className="event-image-wrapper">
      <img src="/assets/images/questroom.jpg" className="event-image"></img>
    </div>
    <div className="event-parameter-group event-dates">
      <div className="event-parameter">
        <FontAwesome name="calendar" className="event-date-icon" />
        <div className="event-date">{datestring}</div>
      </div>
      <div className="event-parameter">
        <FontAwesome name="clock-o" className="event-date-icon" />
        <div className="event-days">4 days</div>
      </div>
    </div>
    <div className="event-parameters p-3">
      <div className="event-parameter-group">
        <div className="event-parameter-name">Tags:</div>
        {event.tag}
      </div>
      <div className="event-parameter-group mt-3">
        <div className="event-parameter-name">Participants:</div>
        <EventParticipants participants={participants}/>
      </div>
    </div>
  </div>
</div>
    )
  }
}

export default (EventDeteailComponent)
