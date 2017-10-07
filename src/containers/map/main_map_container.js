import React, { Component } from 'react'
import MainEventSearchingContainer from './event_searching/main_event_searching_container'
import MainEventCreationContainer from './event_creation/main_event_creation_container'
let C = require("../../constants/map/events.js")

class MainMapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      eventsViewState: C.SEARCHING
    }
  }

  render() {
    var container = null;

    switch (this.state.eventsViewState) {
      case C.SEARCHING:
        container = (<MainEventSearchingContainer/>);
        break;
      case C.CREATION:
        container = (<MainEventCreationContainer/>);
        break;
      default:
        container = (<p>LOADING</p>);
    }

    return(
      <div>
        <span onClick={() => {this.setState({eventsViewState: C.CREATION})}}>Creat</span>
        <br/>
        <span onClick={() => {this.setState({eventsViewState: C.SEARCHING})}}>Search</span>
        {container}
      </div>
    )
  }
}
export default MainMapContainer
