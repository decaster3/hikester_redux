import React, { Component } from 'react'
import OptionEventComponent from './options_event_component'
import DetailEventsComponent from './detail_event_component'

export default class MainMapComponent extends Component {

  render() {
    return(
      <div>
        <OptionEventComponent />
        <DetailEventsComponent />
      </div>
    )
  }
}
