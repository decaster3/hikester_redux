import React, { Component } from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEventLocation } from '../../../actions/events_creation/events_creation';
import Map from '../../../components/map/map';
import { Marker, Circle } from "react-google-maps"


class EventCreationMapContainer extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {
    //Initialize new event location
    this.props.updateEventLocation({latLng: this.props.map.location})
  }

  render() {
    // console.log(this.props);
    const circle =
      <Circle
        center={{lat: this.props.map.circle.center.lat, lng: this.props.map.circle.center.lng}}
        radius={this.props.map.circle.radius}
        options={this.props.map.circle.options}
        visible={this.props.map.circle.visible}
      />
    var marker = <Marker position={this.props.map.location}/>
    return <Map onclick = {this.props.updateEventLocation} map = {this.props.map} markers = {marker} circle = {circle}/>
  }
}

function mapStateToProps(state){
    return {
      map: state.new_event
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      updateEventLocation:updateEventLocation
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreationMapContainer)
