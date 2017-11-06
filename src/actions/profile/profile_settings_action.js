let C = require('../../constants/profile/profile')
import * as firebase from 'firebase';
import { routerMiddleware, push } from 'react-router-redux'
import { notification_success } from '../notification_success'

export function setSettingsCategory(category){
  return function(dispatch) {
    dispatch({type: C.SETTINGS_CATEGORY_SELECTED, category: category})
  }
}
export function afterSave(){
  return function(dispatch){
    dispatch(push('/profile'))
  }
}

export function changeAvatar(ref, filename){
  return function(dispatch, getState) {
    firebase.storage().ref(ref).child(filename).getDownloadURL()
      .then(photoURL => {
        var user = firebase.auth().currentUser;
        firebase.database().ref().child('users').child(user.uid).child("photoUrl").set(photoURL)
        user.updateProfile({photoURL: photoURL});
      });
  }
}

export function updateVerificationProcent(){
  let authRef = firebase.database().ref().child('users')
    .child(firebase.auth().currentUser.uid)
    let nnRef = firebase.database().ref().child('neural_network')
    var count = 0
    var userId = 0
    var a = false
    var user = {}
    var verificationProcent = 0
  authRef.once('value')
    .then(function(snapshot){
      user = snapshot.val()
    }).then(() => {
      var authProviders = []
      for (var i = 0; i < user.authProviders.length; i++){
        authProviders.push(user.authProviders[i].providerId)
      }
      //for neural networks FIX FIX FIX AFTER MAZZARA
      if (user.id == undefined){

        nnRef.once('value').then(function(snap){
          userId = snap.val().count
        }).then( () => {
            console.log(userId);
            authRef.update({
              id: userId + "",
            }).then( () => {
              nnRef.update({
              count: userId + 1
              })
            })
          })
        }
      if (authProviders.includes("facebook.com")){
        verificationProcent += 15
      }
      if (authProviders.includes("password")){
        verificationProcent += 15
      }
      if (authProviders.includes("google.com")){
        verificationProcent += 15
      }
      if (authProviders.includes("phone")){
        verificationProcent += 15
      }
      if (user.about){
        verificationProcent += 10
      }
      if (user.events){
        verificationProcent += 15
      }
    }).then(() => {
      authRef.update({
        verificationProcent: verificationProcent
      })

    })
}

export function setMyEvents(){
  return function(dispatch, getState){
    if(getState().user.events){
      dispatch({type: C.MY_EVENTS_CHANGING_STATE, myEventsCurrently: C.MY_EVENTS_LOADING})
      var eventsAttending = []
      var db = firebase.firestore();
      var promises = [];
      var eventKeys = Object.keys(getState().user.events).map((key) => {

          var fireStoreEventRef = db.collection("events").doc(getState().user.events[key])
          var promise = fireStoreEventRef.get();
         promises.push(promise)
         console.log(promises.length);
      })

      Promise.all(promises).then(eventSnaphots => {
        eventSnaphots.map(doc => {
          if (doc.exists) {
            var eventObj = {
              name: doc.data().name,
              description: doc.data().description,
              cost: doc.data().cost,
              address: doc.data().address,
              date: doc.data().start_datee,
              id: doc.id
            }
            eventsAttending.push(eventObj)
          }
          else{
            console.log("SOMETHING WRONG");
            dispatch({type: C.MY_EVENTS_CHANGING_STATE, myEventsCurrently: C.MY_EVENTS_NOT_LOADED, myEvents: []})
          }
        })
      }).then(() => {
        dispatch({type: C.MY_EVENTS_CHANGING_STATE, myEventsCurrently: C.MY_EVENTS_LOADED, myEvents: eventsAttending})
      });
    }
    else {
      console.log(3);
      dispatch({type: C.MY_EVENTS_CHANGING_STATE, myEventsCurrently: C.MY_EVENTS_LOADED, myEvents: []})
    }
  }
}

export function changeName(name){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            username: name,
          })
      }).then(() =>
      {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
        notification_success("Changes were successfully applied")
      })
}
}

export function changeSex(sex){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
      authRef.child(user.uid).update({
        sex: sex
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}

export function addAvatar(){

}

export function changeLocation(country, city){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            default_country: country,
            default_city: city
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}

export function changeAbout(about){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).update({
            about: about,
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}

export function reacthenticateWithSocChangeEmail(provider, email){
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    firebase.auth().signOut()
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
    firebase.auth().signInWithPopup(provider).then(function(result) {
    }).then(() => {
      var user = firebase.auth().currentUser
      user.updateEmail(email).then(function() {
        authRef.child(user.uid).update({
          email: email,
          emailVerified: false
        })
        authRef.once('value')
          .then(function(snapshot){
              firebase.auth().onAuthStateChanged(function(user) {
                if(!user.emailVerified){
                  user.sendEmailVerification();
                }
              })
          }).then(() =>
          {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
        )
      })

    }).catch(function(error) {
      console.log(error)
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
  }
}

export function changeEmail(email,password){
  let authRef = firebase.database().ref().child('users')
  let user = firebase.auth().currentUser
    return function(dispatch){
      if (Boolean(password)){
        dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
        var credentials = firebase.auth.EmailAuthProvider.credential(
          user.email,
          password
        );
        user.reauthenticateWithCredential(credentials);
      }
      user.updateEmail(email).then(function() {
        authRef.child(user.uid).update({
          email: email,
          emailVerified: user.emailVerified
        })
        authRef.once('value')
          .then(function(snapshot){
              firebase.auth().onAuthStateChanged(function(user) {
                if(!user.emailVerified){
                  user.sendEmailVerification();
                }
              })
          }).then(() =>
          {
            // кейс когда пользователь залогинился недавно, и успешно сменил почту
            dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
        )
      }).catch(function(error) {
        // кейс когда пользователь залогинился давно и ему нужно перелогиниться
          dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_CHANGE_EMAIL})
        });
    }
}

export function verifyEmail(){
  var user = firebase.auth().currentUser
  return function(dispatch){
    user.sendEmailVerification().then(function() {
    console.log("email sent");
    }).catch(function(error) {
    console.log(error.message);
    }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})}
    )
  }
}

export function addPasswordAuth(email, password){
  // нужно тестить
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  auth.currentUser.link(credential).then(function(user) {
    console.log("Account linking success", user);
  }, function(error) {
    console.log("Account linking error", error);
  });
}

export function linkFacebook(){
  //нужно тестить
  let user = firebase.auth().currentUser
  var provider = new firebase.auth.FacebookAuthProvider();
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithPopup(provider).then(function(result) {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })

      console.log("linked facebook");
      notification_success("Facebook was successfully linked")
      console.log(firebase.auth.FacebookAuthProvider());
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}


export function unlinkFacebook(){
  let user = firebase.auth().currentUser
  let providerId = 'facebook.com'
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.unlink(providerId).then(function() {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      notification_success("Facebook was successfully unlinked")
      console.log('unlink facebook was success');
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}

export function linkGoogle(){
  let user = firebase.auth().currentUser
  var provider = new firebase.auth.GoogleAuthProvider();
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithPopup(provider).then(function(result) {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      notification_success("Google was successfully linked")
      console.log("linked google");
    }).catch(function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      console.log(error.message);
    });
  }
}

export function unlinkGoogle(){
  let user = firebase.auth().currentUser
  let providerId = 'google.com'
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.unlink(providerId).then(function() {
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
      notification_success("Google was successfully unlinked")
      console.log('unlink google was success');
    }).catch(function(error) {
      console.log(error.message);
    });
  }
}

export function reacthenticateWithSocAddPassword(providerName, password){
  // на вход приходит пароль и провайдеры доступные для реауза
  var provider = {};
  if (providerName == "facebook")
    provider = new firebase.auth.FacebookAuthProvider();
  else if (providerName == "google")
    provider = new firebase.auth.GoogleAuthProvider();
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    firebase.auth().signOut().then(function() {
      dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_REAUTHENTICATION})
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = firebase.auth().currentUser
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.linkWithCredential(credential).then(function(user) {
          console.log("link with password was success");
          notification_success("Password was successfully linked")
          let authRef = firebase.database().ref().child('users').child(user.uid)
          authRef.update({
            authProviders: user.providerData
          }).then( () => {
            dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
          })
        }, function(error) {
          dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
          console.log("Account password linking error", error);
        });
      })
      .catch(function(error) {
        console.log(error)
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
        })
    }).catch(function(error) {
      console.log(error)
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    });
  }
}

export function linkPassword(password){
  let user = firebase.auth().currentUser
  var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return function(dispatch){
    dispatch({type: C.FIELD_CHANGING, changing: C.LOADING_LINKING})
    user.linkWithCredential(credential).then(function(user) {
      notification_success("Password was successfully linked")
      console.log("link with password was success");
      let authRef = firebase.database().ref().child('users').child(user.uid)
      authRef.update({
        authProviders: user.providerData
      }).then( () => {
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
    }, function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_ADD_PASSWORD})
      console.log("Account password linking error", error);
    });
  }
}
export function reacthenticateChangePassword(oldPassword, newPassword){
  let user = firebase.auth().currentUser
  let authRef = firebase.database().ref().child('users')
  return function(dispatch){
    var credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    );
    console.log(credentials);
    user.reauthenticateWithCredential(credentials).then(function() {
      user.updatePassword(newPassword).then(function() {
        console.log("update password was successful");
        notification_success("Update password was successfully!")
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      }).catch(function(error) {
        console.log(error);
        dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
      })
    }).catch(function(error) {
      console.log(error.message);
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    });

  }
}
export function changePassword(password) {
  var user = firebase.auth().currentUser;
  var newPassword = password;
  return function(dispatch){
    user.updatePassword(newPassword).then(function() {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    }).catch(function(error) {
      dispatch({type: C.FIELD_CHANGING, changing: C.REAUTHENTICATE_USER_FOR_CHANGE_PASSWORD})
    })
  }
}

export function addAddress(country, city, flat, building, comments){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser
  return function(dispatch){
    authRef.once('value')
      .then(function(snapshot){
          authRef.child(user.uid).child('addresses').push({
            country: country,
            city: city,
            flat: flat,
            building: building,
            comments: comments
          })
      }).then(() =>
      {dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})})
  }
}
export function removeAddress(key){
  let authRef = firebase.database().ref().child('users')
  var user = firebase.auth().currentUser

  return function(dispatch){
    authRef.child(user.uid).child("addresses").child(key).remove()
    .then( () => {
      dispatch({type: C.FIELD_CHANGING, changing: C.NOTHING_CHANGES})
    })
  }
}
