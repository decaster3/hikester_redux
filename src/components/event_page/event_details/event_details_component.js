import React, { Component } from 'react'


class EventDeteailComponent extends Component {

  constructor(props){
    super(props)
  }

  render() {
    let event = this.props.event

    return (
      <div>
        {event.name}
      </div>
    )
  }
}

export default (EventDeteailComponent)
