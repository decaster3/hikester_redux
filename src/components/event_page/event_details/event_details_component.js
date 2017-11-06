import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import EventParticipants from './event_participants'
import Map from '../../map/map';
import { Marker } from "react-google-maps";
import moment from 'moment';
import Uploader from '../../file_loader/file_uploader_component';
import * as firebase from 'firebase';

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
        name: user.username,
        photo: user.photoUrl || "/assets/images/default_user_image.png"
      })
    })
    var startDate = moment(event.start_date);
    var date = startDate.format("Do MMMM YYYY");
    var time = startDate.format("mm:HH");

    var location = {lat: event.lat, lng: event.lng}
    var marker = <Marker position={location}/>
    var map = {
      defaultCenter: location,
      defaultZoom: 12
    }
    var edit = null
    var image = event.photoUrl || "/assets/images/questroom.jpg";
    if(firebase.auth().currentUser){
        edit = firebase.auth().currentUser.uid == event.creator ?
          (
            <div>
              <div className="divider"></div>
              <Uploader storagePath={"/events/"} callback={this.props.loadPhoto} filename={event.id}/>
            </div>
          )
        :
          null
    }
    return (
      <div className="px-0" id="event-info">

          <div className="event-name">{event.name}</div>
          <div className="event-image-wrapper">
            <img src={image} className="event-image"></img>
          </div>

          {edit}

          <div className="event-parameter-group event-dates">
            <div className="event-parameter">
              <FontAwesome name="calendar" className="event-date-icon" />
              <div className="event-date">{date}</div>
            </div>
            <div className="event-parameter">
              <FontAwesome name="clock-o" className="event-date-icon" />
              <div className="event-days">{time}</div>
            </div>
          </div>

          <div className="event-parameter-group">
            <div className="event-parameter-value event-map">

            <Map map = {map} markers = {marker}/>
            </div>
          </div>

          <div className="event-parameters p-3">
            <div className="event-parameter-group">
              <div className="event-parameter-name">Tags:</div>
                <div className="event-parameter-value event-tags">
                  <div className="event-tag">
                    {event.tag}
                  </div>
                </div>
            </div>


            <div className="event-parameter-group mt-3">
              <div className="event-parameter-name">Participants:</div>
              <EventParticipants participants={participants}/>
            </div>
          </div>
          <div className="divider"></div>
          {this.props.button}
      </div>
    )
  }
}

export default (EventDeteailComponent)
