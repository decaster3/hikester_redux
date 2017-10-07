import React, { Component } from 'react'
import EventCreationMapComponent from '../../../components/map_page/event_creation/event_creation_map/event_creation_map_component'

class EventCreationMapContainer extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return(
      <div>
        <EventCreationMapComponent/>
      </div>
    )
  }
}
export default EventCreationMapContainer
