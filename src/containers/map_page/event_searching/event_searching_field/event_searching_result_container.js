import React, { Component } from 'react'
import { connect } from 'react-redux';

class EventSearchingResultContainer extends Component {

  constructor(props) {
    super(props)
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
        return (
          <div key = {index}>
            Event1
            <p>name <span>{event.name}</span></p>
            <p>cost <span>{event.cost}</span></p>
            <p>address <span>{event.address}</span></p>
            <p>tag <span>{event.tag}</span></p>
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
      search_events: state.search_events
    }
}

export default connect(mapStateToProps)(EventSearchingResultContainer)
