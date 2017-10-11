import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventCreationFormContainer from './event_creation_form_container';
import EventCreationMapContainer from './event_creation_map_container';

class MainEventCreationContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <EventCreationFormContainer/>
        <EventCreationMapContainer/>
      </div>
    )
  }
}
function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {

    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainEventCreationContainer)
