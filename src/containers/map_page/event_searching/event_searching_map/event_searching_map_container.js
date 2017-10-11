import React, { Component } from 'react'
import Map from '../../../../components/map/map';

class EventSearchingMapContainer extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }

  render() {
    var markers = null
    var map = {
      defaultCenter: { lat: 55.7529120574368, lng: 48.743462562561035 },
      defaultZoom: 16
    }
    return <Map onclick = {this.props.updateEventLocation} map = {map} markers = {markers}/>
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
export default EventSearchingMapContainer
