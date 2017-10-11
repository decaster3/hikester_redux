import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setEventsSettingsCategory } from '../../actions/events_settings_action/event_settings_actions.js'
import MainEventCreationContainer from './event_creation/main_event_creation_container'
import MainEventSearchingContainer from './event_searching/main_event_searching_container'

class MainMapContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let C = require('../../constants/events_settings/events_settings')
    var currentEventComponent = null
    let p = this.props

    switch (p.events_settings.events_settings_category) {
      case C.CREATION_EVENT:
        currentEventComponent = <MainEventCreationContainer />
        break;
      default:
        currentEventComponent =  <MainEventSearchingContainer />
    }

    return(
      <div>
        <ul>
          <li onClick = {() => this.props.setEventsSettingsCategory(C.CREATION_EVENT)}>
            Create
          </li>
          <li onClick = {() => this.props.setEventsSettingsCategory(C.SEARCHING_EVENT)}>
            Find
          </li>
        </ul>
        {currentEventComponent}
      </div>
    )
  }
}
function mapStateToProps(state){
    return {
      events_settings: state.events_settings
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {setEventsSettingsCategory: setEventsSettingsCategory},
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MainMapContainer);
