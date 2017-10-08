import React, { Component } from 'react'
import EventSearchingMapComponent from './event_searching_map_component'
import EventSearchingFieldComponent from './event_searching_field_component'

class MainEventSearchingComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventSearchingFieldComponent/>
        <EventSearchingMapComponent/>
      </div>
    )
  }
}
export default MainEventSearchingComponent
