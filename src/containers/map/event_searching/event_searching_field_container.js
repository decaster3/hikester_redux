import React, { Component } from 'react'
import Tags from '../../../components/map_page/tags_component'
import EventSearchingResultComponent from '../../../components/map_page/event_searching/event_searching_field/event_searching_result_component'
import EventSearchingFiltersComponent from '../../../components/map_page/event_searching/event_searching_field/event_searching_filters_component'

class EventSearchingFieldContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return(
      <div>
        <Tags/>
        <EventSearchingFiltersComponent/>
        <EventSearchingResultComponent/>
      </div>
    )
  }
}
export default EventSearchingFieldContainer
