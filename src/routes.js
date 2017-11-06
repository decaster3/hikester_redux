import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import MainSettingsComponent from './components/profile_page/settings/main_settings_component';
import MainNotificationPageComponent from './components/profile_page/notifications/main_notifications_page_component';
import MainProfileContainer from './containers/profile/main_profile_container';
import AuthContainer from './containers/auth/authenticate_container';
import MainMapContainer from './containers/map_page/main_map_container';
import EventDetailContainer from './containers/event/event_details_container';
import MainTopNavigationBarContainer from './containers/layouts/top_nav_bar/main_top_nav_bar_container';
import AboutComponent from './components/static/about_component'
import SupportComponent from './components/static/support_component'
const configureRoutes = () => {
  return (
    <div id="content">
      <MainTopNavigationBarContainer />
      <Switch>
        <Route exact path="/" component={MainMapContainer} />
        <Route exact path="/profile" component={MainProfileContainer} />
        <Route exact path="/support" component={SupportComponent} />
        <Route exact path="/about" component={AboutComponent} />
        <Route path="/auth" component={AuthContainer} />
        <Route path="/map" component={MainMapContainer} />
        <Route exact path="/event/:id" component={EventDetailContainer} />
        <Route path="/profile/edit" component={MainSettingsComponent} />
        <Route path="/profile/notifications" component={MainNotificationPageComponent} />
      </Switch>
    </div>)
  }
export default configureRoutes
