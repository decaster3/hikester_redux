import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setEventsSettingsCategory } from '../../actions/events_settings_action/event_settings_actions.js'
let C = require("../../constants/events_settings/events_settings.js")

class OptionEventComponent extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ul>
        <li onClick = {() => this.props.setEventsSettingsCategory(C.CREATION_EVENT)}>
          Create
        </li>
        <li onClick = {() => this.props.setEventsSettingsCategory(C.SEARCHING_EVENT)}>
          Find
        </li>
      </ul>
    )
  }
}
function mapStateToProps(state){
    return {
      events_settings: state.events_settings
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {setEventsSettingsCategory: setEventsSettingsCategory},
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(OptionEventComponent);
