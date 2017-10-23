import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setEventsSettingsCategory } from '../../actions/events_settings_action/event_settings_actions.js'
import MainEventSearchingContainer from './event_searching/main_event_searching_container'
import EventSearchingMapContainer from './event_searching/event_searching_map/event_searching_map_container'
import EventCreationMapContainer from './event_creation/event_creation_map_container'
import EventCreationFormContainer from './event_creation/event_creation_form_container'

class MainMapContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let C = require('../../constants/events_settings/events_settings')
    var currentEventComponent = null
    var map = null
    let p = this.props

    switch (p.events_settings.events_settings_category) {
      case C.CREATION_EVENT:
        currentEventComponent = <EventCreationFormContainer />
        map = <EventCreationMapContainer/>
        break;
      default:
        currentEventComponent =  <MainEventSearchingContainer />
        map = <EventSearchingMapContainer/>
    }

    return(
      <div id="home-section" className="page-section container-fluid d-flex px-0">
        <div className="px-0" id="search-create">

          <ul className="tabs nav nav-tabs" role="tablist">

            <li className="nav-item col px-0" onClick = {() => this.props.setEventsSettingsCategory(C.SEARCHING_EVENT)}>
              <a className="nav-link active" id="search-tab" data-toggle="tab" href="#search" role="tab" aria-controls="search" aria-expanded="true">Search</a>
            </li>
            <li className="nav-item col px-0" onClick = {() => this.props.setEventsSettingsCategory(C.CREATION_EVENT)}>
              <a className="nav-link" id="create-tab" data-toggle="tab" href="#create" role="tab" aria-controls="create">Create</a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="search" role="tabpanel" aria-labelledby="search-tab">
              {currentEventComponent}
            </div>
          </div>

        </div>
        <div className="px-0" id="map-block">
          {map}
        </div>
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
