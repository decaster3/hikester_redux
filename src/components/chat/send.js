import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewEvent } from '../../../../actions/events_creation/events_creation'

class EventCreationFormContainer extends Component {

  constructor(props){
    super(props)

  }

  render() {
    let s = this.state
    let p = this.props
    return
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

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationFormContainer)
