import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEventTag } from '../../../actions/events_creation/events_creation'
import * as firebase from 'firebase'

class CreationTags extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tagsView: null
    }
  }
    componentDidMount(){
      var tags = []
      var tagsContainer = {}
      let tagsRef = firebase.database().ref().child('tags')
      tagsRef.once('value', function(snapshot){
      tags = snapshot.val()
  }).then(() => {
        tagsContainer = tags.map((tag, index) => {
        return (
            <button key = {index} onClick = {() => this.props.updateEventTag(tag)}>{tag}</button>)
      })
      console.log(tagsContainer);
      this.setState({
        tagsView: tagsContainer
      })
    })
    }

  render() {
    let p = this.props
    let s = this.state
    return(
      <div>
        {s.tagsView}
      </div>
    )
  }
}
function mapStateToProps(state){
    return {
      new_event: state.new_event
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      updateEventTag: updateEventTag
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreationTags)
