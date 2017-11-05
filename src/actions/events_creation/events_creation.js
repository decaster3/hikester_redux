let C = require('../../constants/events_creation/events_creation')
import { routerMiddleware, push } from 'react-router-redux'
import moment from 'moment';
import UIkit from 'uikit';
const firebase = require("firebase");
import { notification_success } from '../notification_success'
 require("firebase/firestore");

export function updateEventTag(tag){
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS, tag: tag})
  }
}

export function updateEventLocation(event){
  return function(dispatch) {
    var location = null;
    if (typeof event.latLng.lat === "function")
      location = { lat: event.latLng.lat(), lng: event.latLng.lng()}
    else
      location = { lat: event.latLng.lat, lng: event.latLng.lng}
    dispatch({type: C.UPDATE_LOCATION, location})
  }
}
export function createNewEvent(address, cost, start_date, end_date, description, lat, lng, name, max_people_count){
  //realtime db
  start_date = new Date(start_date.toDate().getTime());
  end_date = new Date(end_date.toDate().getTime());
  let user = firebase.auth().currentUser;

  let creatorEventsRef = firebase.database().ref().child('users').child(user.uid).child('my_events')
  let userAttendsEventsRef = firebase.database().ref().child('users').child(user.uid).child('events')
  //firestore db
  var db = firebase.firestore();
  var fireStoreEventsRef = db.collection("events")

  return function(dispatch,getState) {

    var pushh = creatorEventsRef.push()
    var key = pushh.key
    //location not yet
    pushh.set(
      key
    ).then( () =>
      {userAttendsEventsRef.push(key)}
    ).then( () => {
      fireStoreEventsRef.doc(key).set({
            address,
            cost,
            end_date,
            start_date,
            description,
            lat: getState().new_event.location.lat,
            lng: getState().new_event.location.lng,
            name,
            max_people_count,
            people_in_event: 1,
            tag: getState().new_event.tag})
        .then( () => {
          let user = firebase.auth().currentUser
          firebase.database().ref().child('users').child(user.uid).once("value", user => {
            var userFromDB = user.val()
            userFromDB["uid"] = user.key
            firebase.firestore().collection("events").doc(key).collection("users").doc(user.uid).set(
              userFromDB
            )
          })
        })
        .then(function() {
            console.log("Document successfully written!");
              notification_success("Event was successfully created!")
              dispatch(push('/event/' + key))
            // }
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
  }
}
