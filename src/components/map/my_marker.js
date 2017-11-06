import React, { Component } from 'react'
import { Marker, InfoWindow } from "react-google-maps"


class MyMarker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isInfoShown: false
    }
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }
  componentDidMount() {

  }
  onToggleOpen (){
    this.setState({
      isInfoShown: !this.state.isInfoShown
    })
  }

  render() {
    var history = this.props.history;
    return (<Marker
      position={this.props.location}
      onClick={this.onToggleOpen}>
      {this.state.isInfoShown && <InfoWindow onCloseClick={this.onToggleOpen}>
        <div>
          <p onClick={() => history.push('/event/' + this.props.event.id)}>link </p>
          <p>{this.props.event.name} </p>
        </div>
      </InfoWindow>
      }
    </Marker>
    )
  }
}

export default  (MyMarker)
