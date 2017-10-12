import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class ProfileEventsComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let events = this.props.events.map(function(event) {
      return (
        <div className="col-6">
          <div className="profile-event">
            <a href="#">
              <div className="profile-event-name text-center">
                {event.name}
              </div>
            </a>
            <div className="profile-event-description">
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Address
                </div>
                <div className="profile-event-info-value col-9">
                  {event.address}
                </div>
              </div>
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Date
                </div>
                <div className="profile-event-info-value col-9">
                  {event.date}
                </div>
              </div>
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Cost
                </div>
                <div className="profile-event-info-value col-9">
                  {event.cost}
                </div>
              </div>
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Description
                </div>
                <div className="profile-event-info-value col-9">
                  {event.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
    return (
      <div className="profile-events row">
        {events}
      </div>
    );
  }

}
