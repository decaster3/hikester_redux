import React, { Component } from 'react'
import MainEventCreationComponent from './event_creation/main_event_creation_component'
import MainEventSearchingComponent from './event_searching/main_event_searching_component'
import { connect } from 'react-redux'

class DetailEventsComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let p = this.props
    let C = require('../../constants/events_settings/events_settings')
    switch (p.events_settings.events_settings_category) {
      case C.CREATION_EVENT:
        return(

            <MainEventCreationComponent />

        )
      default:
        return(
            <MainEventSearchingComponent />
        )
    }
  }
}
function mapStateToProps(state){
    return {
      events_settings: state.events_settings
    }
}
export default connect(mapStateToProps)(DetailEventsComponent);
