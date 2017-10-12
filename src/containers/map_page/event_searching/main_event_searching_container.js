import React, { Component } from 'react'
import EventSearchingFiltersContainer from './event_searching_field/event_searching_filters_container'
import EventSearchingResultContainer from './event_searching_field/event_searching_result_container'

class MainEventSearchingContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="panel">
        <EventSearchingFiltersContainer/>
        <div className="divider"></div>
        <div className="search-result-text text-center">Results</div>
        <div className="divider"></div>
        <EventSearchingResultContainer/>
      </div>
    )
  }
}
export default MainEventSearchingContainer
