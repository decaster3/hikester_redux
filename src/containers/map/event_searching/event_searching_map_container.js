import React, { Component } from 'react'
import EventSearchingMapComponent from '../../../components/map_page/event_searching/event_searching_map/event_searching_map_component'

class EventSearchingMapContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventSearchingMapComponent/>
      </div>
    )
  }
}
export default EventSearchingMapContainer
