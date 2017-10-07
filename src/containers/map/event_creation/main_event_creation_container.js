import React, { Component } from 'react'
import EventCreationFormContainer from './event_creation_form_container'
import EventCreationMapContainer from './event_creation_map_container'

class MainEventCreationContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <EventCreationFormContainer/>
        <EventCreationMapContainer/>
      </div>
    )
  }
}
export default MainEventCreationContainer
