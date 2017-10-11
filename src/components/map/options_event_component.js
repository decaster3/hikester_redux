import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setEventsSettingsCategory } from '../../actions/events_settings_action/event_settings_actions.js'
let C = require("../../constants/events_settings/events_settings.js")

class OptionEventComponent extends Component {
  constructor(props){
    super(props);
  }
  // <ul>
  //   <li onClick = {() => this.props.setEventsSettingsCategory(C.CREATION_EVENT)}>
  //     Create
  //   </li>
  //   <li onClick = {() => this.props.setEventsSettingsCategory(C.SEARCHING_EVENT)}>
  //     Find
  //   </li>
  // </ul>

  render(){
    return(
      <div className="col-4 px-0" id="search-create">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item col px-0">
            <a onClick = {() => this.props.setEventsSettingsCategory(C.SEARCHING_EVENT)} className="nav-link active" id="search-tab" data-toggle="tab" href="#search" role="tab" aria-controls="search" aria-expanded="true">Search</a>
          </li>
          <li className="nav-item col px-0">
            <a onClick = {() => this.props.setEventsSettingsCategory(C.CREATION_EVENT)} className="nav-link" id="create-tab" data-toggle="tab" href="#create" role="tab" aria-controls="create">Create</a>
          </li>
        </ul>
      </div>
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
