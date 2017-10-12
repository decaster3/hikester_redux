import React from 'react';
import FontAwesome from 'react-fontawesome';
import Participant from './participant';

export default class EventParticipants extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show_only: 5,
      show_all_clicked: false
    };
  }

  show_all_handler() {
    this.setState({
      show_all_clicked: true
    });
  }

  render() {
    let t = this;
    let participants = this.props.participants.map(function(participant, index){
      var show = false;
      if (index < t.state.show_only)
        show = true;
      return <Participant key={index} photo = {participant.photo} name={participant.name} show={show || t.state.show_all_clicked} />
    });
    return (
      <div className="event-parameter-value event-people">
        {participants}
        { (!this.state.show_all_clicked && this.state.show_only < this.props.participants.length) &&
          <a
            className="ui label"
            onClick={this.show_all_handler.bind(this)}>
            Show All
          </a>
        }
      </div>
    );
  }

}
