import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import MainProfileComponent from './components/profile_page/main_profile_component';
import MainAuthComponent from './components/auth_page/main_auth_component';

const configureRoutes = () => {
      return (<div>
                <Switch>
                  <Route exact path="/" component={App} />
                  <Route path="/profile" component={MainProfileComponent}/>
                  <Route path="/auth" component={MainAuthComponent}/>
                </Switch>
              </div>)
      }
export default configureRoutes
