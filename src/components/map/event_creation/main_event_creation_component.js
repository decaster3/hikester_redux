import React, { Component } from 'react'
import EventCreationFormComponent from './event_creation_form_component'
import EventCreationMapComponent from './event_creation_map_component'

class MainEventCreationComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventCreationFormComponent/>
        <EventCreationMapComponent/>
      </div>
    )
  }
}
export default MainEventCreationComponent
