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
      self.setState({ tags: snapshot.val() })
    })
  }

  render() {
    console.log(123);
    let p = this.props
    let s = this.state

    if (!s.tags)
      return <p>LOADING</p>

    const tags = s.tags.map((tag, index) => { return <Tag key={index} tag={tag} onclick={p.updateEventTag}/>})
    return (<EventCreationFormComponent createNewEvent={p.createNewEvent} tags={tags}/>)
  }
}

function mapStateToProps(state) {
    return {

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
