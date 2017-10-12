import React, { Component } from 'react'
export default class LoadingNotificationComponent extends Component {
  render(){
    const Loading = require('react-loading-animation');
    return(
      <div>
        <Loading />
      </div>
    )
  }
}
