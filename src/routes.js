import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import MainSettingsComponent from './components/profile_page/settings/main_settings_component';
import MainNotificationPageComponent from './components/profile_page/notifications/main_notifications_page_component';
import MainProfileComponent from './components/profile_page/main_profile_component';
import MainAuthComponent from './components/auth_page/main_auth_component';
import MainMapComponent from './components/map/main_map_component';
import EventDeteail from './components/event_page/event_detail/main_event_detail_component';

const configureRoutes = () => {
      return (<div>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route exact path="/profile" component={MainProfileComponent} />
                  <Route path="/auth" component={MainAuthComponent} />
                  <Route path="/map" component={MainMapComponent} />
                  <Route exact path="/event" component={MainMapComponent} />
                  <Route exact path="/event/:id" component={EventDeteail} />
                  <Route path="/profile/edit" component={MainSettingsComponent} />
                  <Route path="/profile/notifications" component={MainNotificationPageComponent} />
                </Switch>
              </div>)
      }
export default configureRoutes
