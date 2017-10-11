import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class ProfileAboutComponent extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="profile-about">
        <div className="profile-description-item-list">
          <div className="profile-description-item row">
            <div className="profile-description-item-name col-3 text-right">
              Location
            </div>
            <div className="profile-description-item-value col-9 text-left">
              {this.props.user.default_country} {this.props.user.default_city}
            </div>
          </div>
          <div className="profile-description-item row">
            <div className="profile-description-item-name col-3 text-right">
              Age
            </div>
            <div className="profile-description-item-value col-9 text-left">
              20
            </div>
          </div>
          <div className="profile-description-item row">
            <div className="profile-description-item-name col-3 text-right">
              Sex
            </div>
            <div className="profile-description-item-value col-9 text-left">
              Man
            </div>
          </div>
          <div className="profile-description-item row">
            <div className="profile-description-item-name col-3 text-right">
              Attended Events
            </div>
            <div className="profile-description-item-value col-9 text-left">
              13
            </div>
          </div>
          <div className="profile-description-about text-center">
            {this.props.user.about}
          </div>
        </div>
      </div>
    );
  }

}
