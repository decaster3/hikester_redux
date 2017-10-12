import React, { Component } from 'react'
import { connect } from 'react-redux';
import { scheduleEvent, startListeningEvents } from '../../../../actions/search_events/search_events_action'
import { bindActionCreators } from 'redux';
import EventSearchingResultComponent from '../../../../components/map/event_searching/event_searching_result_component'
import EventSearchingResultButtonComponent from '../../../../components/map/event_searching/event_searching_result_button'

class EventSearchingResultContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.startListeningEvents()
  }

  render() {
    let p = this.props
    let s = this.state
    const Loading = require('react-loading-animation');
    switch (p.search_events.currently) {
      case "LOADED":
      if(p.search_events.events.length == 0)
        return ( <div>Sorry.There are no events by this filters</div> )

      var signedIn = p.user.currently != "ANONYMOUS";

      const events = p.search_events.events.map((event, index) => {
        var eventButton = <EventSearchingResultButtonComponent signedIn={signedIn} joined={event.attending} eventId={event.id}/>
        return (<EventSearchingResultComponent event={event} key={index} eventButton={eventButton}/>)
      });

      return ( <div className="event-list row mx-0"> {events} </div>)
      default:
      return  (<Loading />)
    }

<<<<<<< HEAD
=======
    if(p.search_events.events.length == 0)
      return ( <div>There are no events by this filters</div> )

    var signedIn = p.user.currently != "ANONYMOUS";

    const events = p.search_events.events.map((event, index) => {
      var eventButton = <EventSearchingResultButtonComponent onclick={this.props.scheduleEvent } signedIn={signedIn} joined={event.attending} eventId={event.id}/>
      return (<EventSearchingResultComponent event={event} key={index} eventButton={eventButton}/>)
    });

    return ( <div className="event-list row mx-0"> {events} </div>)
>>>>>>> add_join_button

  }
}
function mapStateToProps(state){
    return {
      search_events: state.search_events,
      user: state.user
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      startListeningEvents: startListeningEvents,
      scheduleEvent: scheduleEvent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSearchingResultContainer)
