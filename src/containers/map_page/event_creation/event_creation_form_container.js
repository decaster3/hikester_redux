import React, { Component } from 'react'
import Tag from '../../../components/map/tag'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewEvent, updateEventTag, drawCircle, suggestTime, suggestDay } from '../../../actions/events_creation/events_creation'
import EventCreationFormComponent from '../../../components/map/event_creation/event_creation_form_component'
import * as firebase from 'firebase'

class EventCreationFormContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tags: null
    }
  }

  componentDidMount(){
    var self = this
    firebase.database().ref().child('tags').once('value', function(snapshot){
      var tags = []
      snapshot.forEach(data => {
        var tag = {}
        tag["name"] = data.val()
        tags.push(tag)
      })
      self.setState({ tags })
    })
  }

  render() {
    let p = this.props
    let s = this.state
    const Loading = require('react-loading-animation');
    if (!s.tags)
      return <Loading />
    const tags = s.tags.map((tag, index) => { return <Tag key={index} tag={tag} selected={p.new_event.tag == tag.name} onclick={p.updateEventTag} drawCircle={p.drawCircle} suggestTime={p.suggestTime} suggestDay={p.suggestDay}/>})
    return (<EventCreationFormComponent user = {p.user} createNewEvent={p.createNewEvent} tags={tags} suggestedTime={p.new_event.suggestedTime} suggestedDay={p.new_event.suggestedDay}/>)
  }
}

function mapStateToProps(state) {
    return {
      user: state.user,
      new_event: state.new_event
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewEvent: createNewEvent,
      updateEventTag: updateEventTag,
      drawCircle: drawCircle,
      suggestTime: suggestTime,
      suggestDay: suggestDay
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationFormContainer)
