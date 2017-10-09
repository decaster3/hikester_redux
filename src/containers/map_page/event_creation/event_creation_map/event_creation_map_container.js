import React from "react"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateEventLocation } from '../../../../actions/events_creation/events_creation';
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const EventCreationMapContainer = compose (
  lifecycle({
    componentDidMount() {
      props.updateEventLocation(props.map.location)
    },
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div  style={{ height: `100%` }} />,
    containerElement: <div  style={{ height: `400px` }} />,
    mapElement: <div  style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    onClick = {(event) => {props.updateEventLocation(event.latLng)}}
    defaultZoom={props.map.defaultZoom}
    defaultCenter = {props.map.defaultCenter}
  >
    <Marker position={props.map.location}/>
  </GoogleMap>
)

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
