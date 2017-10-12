import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chanageFilters, updateEventTagSearch, clearFilters } from '../../../../actions/search_events/search_events_action'
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from 'firebase'
import Tag from '../../../../components/map/tag'
import EventSearchingFiltersComponent from '../../../../components/map/event_searching/event_searching_filters_component'

class EventSearchingFiltersContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      tags: null
    }
  }//

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
    let s = this.state
    let p = this.props

    if (!s.tags)
      return <p>LOADING</p>

    const tags = s.tags.map((tag, index) => { return <Tag key={index} tag={tag} onclick={p.updateEventTagSearch}/>})

    return(
      <EventSearchingFiltersComponent tags={tags} chanageFilters={p.chanageFilters} clearFilters={p.clearFilters}/>
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
      chanageFilters: chanageFilters,
      updateEventTagSearch: updateEventTagSearch,
      clearFilters: clearFilters
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSearchingFiltersContainer)
