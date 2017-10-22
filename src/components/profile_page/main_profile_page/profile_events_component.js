import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setMyEvents } from '../../../actions/profile/profile_settings_action'
import { Link } from 'react-router-dom'
class ProfileEventsComponent extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.setMyEvents()
  }

  render() {
    var events = {}
    let p = this.props
    switch (p.profile_settings.myEventsCurrently) {
      case "MY_EVENTS_LOADED":
          if (p.profile_settings.myEvents.length > 0){
            console.log(1234);
            events = p.profile_settings.myEvents.map(function(event, index) {
            return (
              <div key = {index} className="col-6">
                <div className="profile-event">
                  <Link to = {'/event/' + event.id}>
                    <div className="profile-event-name text-center">
                      {event.name}
                    </div>
                  </Link>
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
          return (<div>{events}</div>)
        }
        else {
          return (<div>You havent attend in any event</div>)
        }
      case "MY_EVENTS_LOADING":
      const Loading = require('react-loading-animation');
        return (
          <Loading />
        )
      default:
        return (
          <div>Connection Error!</div>
        )
    }
    return (
      <div className="profile-events row">
        hey
      </div>
    );
  }

}

function mapStateToProps(state){
    return {
      user: state.user,
      profile_settings: state.profile_settings
    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      setMyEvents: setMyEvents
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEventsComponent);
