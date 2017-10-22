import React from "react"
import { compose, withProps, withStateHandlers, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const Map = compose (
  lifecycle({
    componentDidMount() {
      
    },
  }),
  withProps({
      isMarkerShown: true,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDG2gZ_zlXUbQQcuEs-3i11duHwmhL0ULA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    onClick = {(event) => {if (props.onclick) props.onclick(event);}}
    defaultZoom={props.map.defaultZoom}
    defaultCenter = {props.map.defaultCenter}
  >
    {props.markers}
  </GoogleMap>
)

export default Map
