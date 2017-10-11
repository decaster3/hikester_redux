import React, { Component } from 'react'
import ChatContainer from './chat/chat'
import EventDeteailComponent from '../../components/event_page/event_details/event_details_component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { loadEvent } from '../../actions/event_details/event_details_actions'

class EventDetailContainer extends Component {

  constructor(props){
    super(props)
    this.eventId = this.props.match.params.id
  }

  componentDidMount() {
    this.props.loadEvent(this.eventId)
  }

  render() {
    let C = require("../../constants/event_details/event_details.js")

    var result = null;
    var a = this.props.state
    switch (a) {
      case C.LOADED:
        return (
          <div>
            <EventDeteailComponent event={this.props.event}/>
            <ChatContainer/>
          </div>
        )

      case C.LOADING:
        return(
          <p>LOADING</p>
        )
      case C.NOT_LOADED:
        return(
          <p>NOT LOADED YET</p>
        )
      default:
        return(
          <p>ERROR!</p>
        )
    }

    return (<div>{result}</div>)
  }

}

function mapStateToProps(state){
  return {
    event: state.event_details.event,
    state: state.event_details.state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      loadEvent: loadEvent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailContainer)
