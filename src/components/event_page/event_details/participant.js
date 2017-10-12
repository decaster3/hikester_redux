import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class Participant extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    let display_style = this.props.show ? 'inline-block' : 'none';
    return (
      <a
        className="ui image label"
        style={{
          display: display_style
        }}>
        <img src={this.props.photo} />
        {this.props.name}
      </a>
    );
  }

}
