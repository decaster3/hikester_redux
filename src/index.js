import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore'
import * as firebase from 'firebase';
import { startListeningToAuth } from './actions/auth/authentication_actions';

var config = {
    apiKey: "AIzaSyAliYBadbVCrUv7Y-WMu--BmwmL99Ba42I",
    authDomain: "hikesterrr.firebaseapp.com",
    databaseURL: "https://hikesterrr.firebaseio.com",
    projectId: "hikesterrr",
    storageBucket: "hikesterrr.appspot.com",
    messagingSenderId: "681168179245"
  };
  firebase.initializeApp(config);

const store = configureStore()

ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);
// NOTE: слушает, вошел ли пользователь
setTimeout(function(){
	store.dispatch( startListeningToAuth() );
});
// NOTE: хот реплейсмент при появлении новых верхних элементов в дереве редаксa
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
