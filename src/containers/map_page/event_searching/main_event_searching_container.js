import React, { Component } from 'react'
import EventSearchingFiltersContainer from './event_searching_field/event_searching_filters_container'
import EventSearchingResultContainer from './event_searching_field/event_searching_result_container'
import EventSearchingMapContainer from './event_searching_map/event_searching_map_container'

class MainEventSearchingContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventSearchingFiltersContainer/>
        <EventSearchingResultContainer/>
        <EventSearchingMapContainer/>
      </div>
    )
  }
}
export default MainEventSearchingContainer
