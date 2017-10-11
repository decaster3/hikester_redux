import React, { Component } from 'react'
import EventCreationMapContainer from '../../../containers/map_page/event_creation/event_creation_map/event_creation_map_container'

class EventCreationMapComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventCreationMapContainer/>
      </div>
    )
  }
}
export default EventCreationMapComponent
