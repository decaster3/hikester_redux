import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class NotificationsMenuItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="menu-item">
        <FontAwesome name="bell" className="mr-2"/>
        ({this.props.count})
      </div>
    );
  }
}
export default NotificationsMenuItem;
