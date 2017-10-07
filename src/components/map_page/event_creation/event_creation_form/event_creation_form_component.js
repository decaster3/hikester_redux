import React, { Component } from 'react'

class EventCreationFormComponent extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return(
      <div>
        Form fields
        <br/>
        {this.props.tags}
        <br/>
        Submit
      </div>
    )
  }
}
export default EventCreationFormComponent
