import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'
import UIkit from 'uikit';

class NotificationsMenuItem extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Link to = "/profile/notifications" className="menu-item">
        <FontAwesome name="bell" className="mr-2"/>
        ({this.props.count})
      </Link>
    );
  }
}
export default NotificationsMenuItem;
