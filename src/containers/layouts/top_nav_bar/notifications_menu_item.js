import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import UIkit from 'uikit';

class NotificationsMenuItem extends Component {

  constructor(props){
    super(props);
  }

  notification() {
    UIkit.notification({
      message: 'Notification message!',
      status: 'primary',
      pos: 'top-left',
      timeout: 4000
    });
  }

  render() {
    return (
      <div onClick={this.notification} className="menu-item">
        <FontAwesome name="bell" className="mr-2"/>
        ({this.props.count})
      </div>
    );
  }
}
export default NotificationsMenuItem;
