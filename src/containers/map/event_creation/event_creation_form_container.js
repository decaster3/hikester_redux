import React, { Component } from 'react'
import Tags from '../../../components/map_page/tags_component'
import EventCreationFormComponent from '../../../components/map_page/event_creation/event_creation_form/event_creation_form_component'

class EventCreationFormContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const tags = (<Tags/>);

    return(
      <div>
        <EventCreationFormComponent tags={tags}/>
      </div>
    )
  }
}
export default EventCreationFormContainer
