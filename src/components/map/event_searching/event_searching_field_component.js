import React, { Component } from 'react'
import EventSearchingResultContainer from '../../../containers/map_page/event_searching/event_searching_field/event_searching_result_container'
import EventSearchingFiltersContainer from '../../../containers/map_page/event_searching/event_searching_field/event_searching_filters_container'

class EventSearchingFieldComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return(
      <div>
        <EventSearchingFiltersContainer/>
        <EventSearchingResultContainer/>
      </div>
    )
  }
}
export default EventSearchingFieldComponent
