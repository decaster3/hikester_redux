import React, { Component } from 'react'
import EventCreationFormContainer from '../../../containers/map_page/event_creation/event_creation_form/event_creation_form_container'

class EventCreationFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return(
      <div>
        <EventCreationFormContainer />
      </div>
    )
  }
}
export default EventCreationFormComponent
