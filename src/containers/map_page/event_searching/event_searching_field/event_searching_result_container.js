import React, { Component } from 'react'
import { connect } from 'react-redux';
import { scheduleEvent, startListeningEvents } from '../../../../actions/search_events/search_events_action'
import { bindActionCreators } from 'redux';
class EventSearchingResultContainer extends Component {

  constructor(props) {
    super(props)
    this.scheduleEventWithReRender = this.scheduleEventWithReRender.bind(this)
  }
  scheduleEventWithReRender(id){
    scheduleEvent(id)
    this.props.startListeningEvents()
  }

  render() {
    let p = this.props
    let s = this.state
    if(p.search_events.events.length == 0){
      return (
        <div>There is no events on this filters</div>
      )
    }
    else {
      const events = p.search_events.events.map((event, index) => {
        var eventAttanding = <div>чтобы записаться на эвент, зарегестрируйтесь</div>
        if (p.user.currently != "ANONYMOUS"){
          if (event.attending == true){
            eventAttanding = (<div>
              You already attend on this event
              <button>Detail</button>
            </div>)
          }else {
            eventAttanding = (
              <button onClick = {() => this.scheduleEventWithReRender(event.id)}>Schedule an event</button>
            )
          }
        }
        return (
          <div key = {index}>
            Event1
            <p>name <span>{event.name}</span></p>
            <p>cost <span>{event.cost}</span></p>
            <p>address <span>{event.address}</span></p>
            <p>tag <span>{event.tag}</span></p>
            {eventAttanding}
          </div>)
      });
      return (
        <div>
          {events}
        </div>)
    }
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
      startListeningEvents: startListeningEvents
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSearchingResultContainer)
