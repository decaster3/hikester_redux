import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let active_message = this.props.active ? ' active flex-row-reverse text-right' : '';
    return (
      <div className={"message-item d-flex justify-content-center" + active_message}>
        <div className="message-person-photo-wrapper">
          <img src={this.props.photoURL} className="message-person-photo" />
        </div>
        <div className="message-wrapper">
          <div className="message-person">
            {this.props.autor}
          </div>
          <div className="message-text">
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }

}
