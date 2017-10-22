import React, { Component } from 'react'
import Tag from '../../../components/map/tag'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewEvent, updateEventTag } from '../../../actions/events_creation/events_creation'
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
        tag["selected"] = false
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
    const tags = s.tags.map((tag, index) => { return <Tag key={index} tag={tag} onclick={p.updateEventTag}/>})
    return (<EventCreationFormComponent user = {p.user} createNewEvent={p.createNewEvent} tags={tags}/>)
  }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createNewEvent: createNewEvent,
      updateEventTag: updateEventTag
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationFormContainer)
