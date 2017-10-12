import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import Map from '../../../../components/map/map';
import { Marker } from "react-google-maps"
import { withRouter } from 'react-router-dom'
class EventSearchingMapContainer extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    console.log(this.props);
    var markers = this.props.events.map(event => {
      var location = {lat: event.lat, lng: event.lng}
      return <Marker position={location} onClick={() => this.props.history.push('/event/' + event.id)}/>
    })
    var map = {
      defaultCenter: { lat: 55.7529120574368, lng: 48.743462562561035 },
      defaultZoom: 16
    }
    return <Map map = {map} markers = {markers}/>
  }
}

function mapStateToProps(state){
  return {
    events: state.search_events.events
  }
}

function mapDispatchToProps(dispatch){
return bindActionCreators(
  {

  },
  dispatch
)
}
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(EventSearchingMapContainer))
