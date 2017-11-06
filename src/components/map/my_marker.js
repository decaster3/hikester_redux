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
    let image = this.props.event.photoUrl || "/assets/images/questroom.jpg";
    return (<Marker
      position={this.props.location}
      onClick={this.onToggleOpen}>
      {this.state.isInfoShown &&
        <InfoWindow onCloseClick={this.onToggleOpen} className="infwndw">
          <div className="event-info-window">
            <div className="profile-event-name text-center" onClick={() => history.push('/event/' + this.props.event.id)}>
              {this.props.event.name}
            </div>
            <div className="event-item-image mb-2">
              <img src={image} />
            </div>
            <div className="profile-event-description">
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Date
                </div>
                <div className="profile-event-info-value col-9">
                  {this.props.event.date}
                </div>
              </div>
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Cost
                </div>
                <div className="profile-event-info-value col-9">
                  {this.props.event.cost}
                </div>
              </div>
              <div className="profile-event-info row">
                <div className="profile-event-info-name col-3">
                  Description
                </div>
                <div className="profile-event-info-value col-9">
                  {this.props.event.description}
                </div>
              </div>
            </div>
          </div>
        </InfoWindow>
      }
    </Marker>
    )
  }
}

export default  (MyMarker)
