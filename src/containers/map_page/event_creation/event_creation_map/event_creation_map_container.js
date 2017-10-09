import React, { Component } from 'react'
import MyFancyComponent from '../../map'

class EventCreationMapContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <MyFancyComponent/>
        Event Creation MAP!!!
      </div>
    )
  }
}
export default EventCreationMapContainer
