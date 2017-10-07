import React, { Component } from 'react'
import EventSearchingMapContainer from './event_searching_map_container'
import EventSearchingFieldContainer from './event_searching_field_container'

class MainEventSearchingContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventSearchingFieldContainer/>
        <EventSearchingMapContainer/>
      </div>
    )
  }
}
export default MainEventSearchingContainer
