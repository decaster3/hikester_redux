import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import MainSettingsComponent from './components/profile_page/settings/main_settings_component';
import MainNotificationPageComponent from './components/profile_page/notifications/main_notifications_page_component';
import MainProfileComponent from './components/profile_page/main_profile_component';
import AuthContainer from './containers/auth/authenticate_container';
import MainMapComponent from './components/map/main_map_component';
import EventDetailContainer from './containers/event/event_details_container';

const configureRoutes = () => {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/profile" component={MainProfileComponent} />
            <Route path="/auth" component={AuthContainer} />
            <Route path="/map" component={MainMapComponent} />
            <Route exact path="/event" component={MainMapComponent} />
            <Route exact path="/event/:id" component={EventDetailContainer} />
            <Route path="/profile/edit" component={MainSettingsComponent} />
            <Route path="/profile/notifications" component={MainNotificationPageComponent} />
          </Switch>
        </div>)
      }
export default configureRoutes
