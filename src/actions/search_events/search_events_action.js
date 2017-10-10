let C = require('../../constants/search_events/search_events')
import { startListeningToAuth } from '../auth/authentication_actions'
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

export function scheduleEvent(id){
  let user = firebase.auth().currentUser
  let authRef = firebase.database().ref().child('users').child(user.uid).child('events')
  authRef.push(id)
}

export function updateEventTagSearch(tag){
  var db = firebase.firestore();
  var unsubscribe = db.collection("events")
    .onSnapshot(function () {});
  unsubscribe();
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS_SEARCH, tag: tag})
  }
}

export function chanageFilters(cost, start_date, end_date){
  let fields = {
    cost: cost,
    start_date: new Date(start_date.toDate().getTime()),
    end_date: new Date(end_date.toDate().getTime())
  }
  return function(dispatch) {
    console.log(fields);
    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields: fields})
  }
}
export function clearFilters(){
  let fields = {
    cost: null,
    start_date: null,
    end_date: null
  }
}

export function updateEventLocationSearch(location){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION_SEARCH, location: location})
  }
}


export function startListeningEvents(){
  firebase.auth().onAuthStateChanged(function(user) {
      return function(dispatch, getState){
  var db = firebase.firestore();
  var userEvents = []

  var fireStoreEventsRef = db.collection("events")
  var events = []
  //набор событий в которых учавствует юзер в переменную userEvents
  if(user){
    console.log(1);
    firebase.database().ref().child('users').child(user.uid)
          .child('events').on('value', function(snapshot) {
      var events = snapshot.val()
      if(snapshot.val() != undefined){
        Object.keys(snapshot.val()).map((key) =>{
          userEvents.push(events[key])
        })
      }
    })
  }
console.log(2);


      if(getState().search_events.tag != null){
        fireStoreEventsRef = fireStoreEventsRef.where("tag", "==", String(getState().search_events.tag))
      }
      if(getState().search_events.start_date != null){
        fireStoreEventsRef = fireStoreEventsRef.where("start_date", ">", getState().search_events.start_date)
      }
      if(getState().search_events.end_date != null){
        fireStoreEventsRef = fireStoreEventsRef.where("start_date", "<", getState().search_events.end_date)
      }
      fireStoreEventsRef.onSnapshot(function(querySnapshot) {
          events = []
          querySnapshot.forEach(function(doc) {
            //присваивается поле attending для эвента, те события в которых уже учавствует юзер
            if (!userEvents.includes(doc.id)){
              var event = doc.data();
              event['id'] = doc.id;
              event['attending'] = false;
              events.push(event);
            }
            else {
              var event = doc.data();
              event['id'] = doc.id;
              event['attending'] = true;
              events.push(event);
            }
        })
        dispatch({type: C.UPDATE_EVENTS, events: events})
      })
  }
})
}
