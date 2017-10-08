import React, { Component } from 'react'
import EventSearchingMapContainer from '../../../containers/map_page/event_searching/event_searching_map/event_searching_map_container'

class EventSearchingMapComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventSearchingMapContainer/>
      </div>
    )
  }
}
export default EventSearchingMapComponent
