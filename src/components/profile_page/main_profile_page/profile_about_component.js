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
            {this.props.user.default_country?
              <div className="profile-description-item-value col-9 text-left">
                {this.props.user.default_country} {this.props.user.default_city}
              </div>
              :
              <div className="profile-description-item-value col-9 text-left">
                You can add this information in settings
              </div>
            }

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
              {this.props.user.sex?
                <div>{this.props.user.sex}</div>
              :
                <div>You can add in in settings!</div>
              }
            </div>
          </div>
          <div className="profile-description-item row">
            <div className="profile-description-item-name col-3 text-right">
              Attended Events
            </div>
            <div className="profile-description-item-value col-9 text-left">
              {this.props.user.events?
                <div>{Object.keys(this.props.user.events).length}</div>
              :
                <div>You are not in any event!</div>
              }
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
