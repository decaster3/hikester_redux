import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import MainSettingsComponent from './components/profile_page/settings/main_settings_component';
import MainNotificationPageComponent from './components/profile_page/notifications/main_notifications_page_component';
import MainProfileComponent from './components/profile_page/main_profile_component';
import AuthContainer from './containers/auth/authenticate_container';
import MainMapContainer from './containers/map_page/main_map_container';
import EventDetailContainer from './containers/event/event_details_container';
import MainTopNavigationBarContainer from './containers/layouts/top_nav_bar/main_top_nav_bar_container'
import Uploader from './components/file_loader/file_uploader_component'

const configureRoutes = () => {
  return (
    <div id="content">
      <MainTopNavigationBarContainer />
      <Switch>
        <Route exact path="/" component={MainMapContainer} />
        <Route path="/uploader" component={Uploader} />
        <Route exact path="/profile" component={MainProfileComponent} />
        <Route path="/auth" component={AuthContainer} />
        <Route path="/map" component={MainMapContainer} />
        <Route exact path="/event/:id" component={EventDetailContainer} />
        <Route path="/profile/edit" component={MainSettingsComponent} />
        <Route path="/profile/notifications" component={MainNotificationPageComponent} />
      </Switch>
    </div>)
  }
export default configureRoutes
