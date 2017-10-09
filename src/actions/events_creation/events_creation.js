let C = require('../../constants/events_creation/events_creation')
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

export function updateEventTag(tag){
  console.log(tag);
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS, tag: tag})
  }
}

export function updateEventLocation(location){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION, location: location})
  }
}
export function createNewEvent(address,cost,start_time,end_time,description,lat,lng,name,max_people_count,start_date){
  //realtime db
  let start_datee = new Date(start_date.toDate().getTime())
  let user = firebase.auth().currentUser
  let allEventsRef = firebase.database().ref().child('events')
  let creatorEventsRef = firebase.database().ref().child('users').child(user.uid).child('my_events')
  let userAttendsEventsRef = firebase.database().ref().child('users').child(user.uid).child('events')
  //firestore db
  var db = firebase.firestore();
  var fireStoreEventsRef = db.collection("events")

  return function(dispatch,getState) {
    let tag = getState().new_event.tag
    let event = {
      address: address,
      cost: cost,
      end_time: end_time,
      start_time: start_time,
      description: description,
      lat: lat,
      lng: lng,
      name: name,
      max_people_count: max_people_count,
      start_date: start_datee,
      tag: getState().new_event.tag
    }

    var push = creatorEventsRef.push()
    var key = push.key
    //location not yet
    push.set(
      event
    ).then( () =>
      {userAttendsEventsRef.push(key)}
    ).then( () => {
      fireStoreEventsRef.doc(key).set({
            address: address,
            cost: cost,
            end_time: end_time,
            start_time: start_time,
            description: description,
            lat: lat,
            lng: lng,
            name: name,
            max_people_count: max_people_count,
            start_date: start_datee,
            tag: getState().new_event.tag})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    })
  }
}
