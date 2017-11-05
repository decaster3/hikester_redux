import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MainProfilePageComponent from '../../components/profile_page/main_profile_page/main_profile_page_component';
import { changeAvatar } from '../../actions/profile/profile_settings_action';

class MainProfileContainer extends Component {
  render(){
    return(
      <MainProfilePageComponent changeAvatar={this.props.changeAvatar}/>
    )
  }
}
function mapStateToProps(state){
    return {

    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      changeAvatar: changeAvatar
    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(MainProfileContainer);
