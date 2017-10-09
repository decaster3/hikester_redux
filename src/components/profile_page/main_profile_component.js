import React, { Component } from 'react'
import MainSettingsComponent from './settings/main_settings_component'
import MainProfilePageComponent from './main_profile_page/main_profile_page_component'

export default class MainProfileComponent extends Component {
  render(){
    return(
      <div>
        <MainProfilePageComponent />
      </div>
    )
  }
}
