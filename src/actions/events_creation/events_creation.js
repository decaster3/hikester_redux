let C = require('../../constants/events_creation/events_creation')
import { routerMiddleware, push } from 'react-router-redux'
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

export function updateEventTag(tag){
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS, tag: tag})
  }
}

export function updateEventLocation(event){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION, location: event.latLng})
  }
}
export function createNewEvent(address, cost, start_time, end_time, description, lat, lng, name, max_people_count, start_date){
  //realtime db
  start_date = new Date(start_date.toDate().getTime())
  let user = firebase.auth().currentUser
  let creatorEventsRef = firebase.database().ref().child('users').child(user.uid).child('my_events')
  let userAttendsEventsRef = firebase.database().ref().child('users').child(user.uid).child('events')
  //firestore db
  var db = firebase.firestore();
  var fireStoreEventsRef = db.collection("events")
  console.log(123);
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
            end_time,
            start_time,
            description,
            lat: getState().new_event.location.lat(),
            lng: getState().new_event.location.lng(),
            name,
            max_people_count,
            start_date,
            tag: getState().new_event.tag})
        .then( () => {
          let user = firebase.auth().currentUser
          firebase.database().ref().child('users').child(user.uid).once("value", user => {
            var userFromDB = user.val()
            userFromDB["uid"] = user.key
            firebase.firestore().collection("events").doc(key).collection("users").doc(user.uid).set({
              userFromDB
            })
          })
        })
        .then(function() {
            console.log("Document successfully written!");
            // return function(dispatch){
              dispatch(push('/event/' + key))
            // }
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
  }
}
