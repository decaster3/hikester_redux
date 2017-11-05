import React, { Component } from 'react'
import ChatContainer from './chat/chat'
import EventDeteailComponent from '../../components/event_page/event_details/event_details_component'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { loadEvent } from '../../actions/event_details/event_details_actions'
import EventSearchingResultButtonComponent from '../../components/map/event_searching/event_searching_result_button'
import { scheduleEvent } from '../../actions/search_events/search_events_action'

class EventDetailContainer extends Component {

  constructor(props){
    super(props)
    this.eventId = this.props.match.params.id
  }

  componentDidMount() {
    this.props.loadEvent(this.eventId)
  }

  render() {
    let p = this.props
    let C = require("../../constants/event_details/event_details.js")
    var result = null;
    var a = this.props.state
    const Loading = require('react-loading-animation');
    switch (a) {
      case C.LOADED:
        var event = this.props.event

        var signedIn = this.props.user.currently == "SIGNED_IN";
        var eventButton = <EventSearchingResultButtonComponent onclick={this.props.scheduleEvent } signedIn={signedIn} joined={event.attending} eventId={event.id}/>
        return (
          <div id="event-section" className="page-section container-fluid d-flex px-0">
            <EventDeteailComponent event={this.props.event} button={eventButton}/>
            {
              signedIn?
                ( p.event.attending?
                  <ChatContainer eventId = {this.eventId}/>
                :
                  <div id="chat-section" className="d-flex px-0">
                    <div id="chat-section-cant-see-overlay">
                      <div className="overlay-text mb-3">Join the event to see the chat</div>
                    </div>
                    <div className="chat-form">
                      <input type="text" placeholder="Message.." className="chat-form-input"/>
                      <button className="button chat-form-submit">
                        Send
                      </button>
                    </div>
                  </div>
                )
              :
                <div id="chat-section" className="d-flex px-0">
                  <div id="chat-section-cant-see-overlay">
                    <div className="overlay-text mb-3">Sign In to see the chat</div>
                  </div>
                  <div className="chat-form">
                    <input type="text" placeholder="Message.." className="chat-form-input"/>
                    <button className="button chat-form-submit">
                      Send
                    </button>
                  </div>
                </div>
            }

          </div>
        )

      case C.LOADING:
        return(
          <Loading />
        )
      case C.NOT_LOADED:
        return(
          <p>event NOT LOADED YET</p>
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
    user: state.user,
    state: state.event_details.state
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      loadEvent: loadEvent,
      scheduleEvent: scheduleEvent
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailContainer)
