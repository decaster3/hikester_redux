let C = require('../../constants/search_events/search_events')
import { startListeningToAuth } from '../auth/authentication_actions'
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

export function scheduleEvent(id) {
  let user = firebase.auth().currentUser
  firebase.database().ref().child('users').child(user.uid).child('events').push(id)

  firebase.database().ref().child('users').child(user.uid).once("value", user => {
    var userFromDB = user.val()
    firebase.firestore().collection("events").doc(id).collection("users").doc(user.uid).set({
      userFromDB
    })
  })

}

export function updateEventTagSearch(tag){
  var db = firebase.firestore();
  var unsubscribe = db.collection("events")
    .onSnapshot(function () {});
  unsubscribe();
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS_SEARCH, tag})
  }
}

export function chanageFilters(cost, start_date, end_date){
  let fields = {
    cost: cost,
    start_date: new Date(start_date.toDate().getTime()),
    end_date: new Date(end_date.toDate().getTime())
  }
  return function(dispatch) {

    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields})
    dispatch(startListeningEvents())
  }
}
export function clearFilters(){
  let fields = {
    cost: null,
    start_date: null,
    end_date: null
  }
  //  dispatch(startListeningEvents())
}

export function updateEventLocationSearch(location){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION_SEARCH, location})
  }
}

export function userParticipationListener() {
  return function(dispatch, getState){
    let user = firebase.auth().currentUser

    if (user) {
      firebase.database().ref().child('users').child(user.uid)
            .child('events').on('value', function(snapshot) {
        var userEvents = []
        var events = getState().search_events.events
        if (events.length == 0)
          return

        var dbUserEvents = snapshot.val()

        if(dbUserEvents != undefined) {
          Object.keys(dbUserEvents).map(key =>{
            userEvents.push(dbUserEvents[key])
          })
        }

        events = events.map(event => {
          var e = Object.assign({}, event)
          e['attending'] = userEvents.includes(event.id)
          return e
        })

        dispatch({type: C.UPDATE_EVENTS, events})

      })
    }
  }
}

export function startListeningEvents(){
  var db = firebase.firestore();

  var fireStoreEventsRef = db.collection("events")
  var events = []
  //набор событий в которых учавствует юзер в переменную userEvents

  return function(dispatch, getState){

      if (getState().search_events.tag)
        fireStoreEventsRef = fireStoreEventsRef.where("tag", "==", String(getState().search_events.tag))

      if (getState().search_events.start_date)
        fireStoreEventsRef = fireStoreEventsRef.where("start_date", ">", getState().search_events.start_date)

      if (getState().search_events.end_date)
        fireStoreEventsRef = fireStoreEventsRef.where("start_date", "<", getState().search_events.end_date)

      fireStoreEventsRef.onSnapshot(function(querySnapshot) {
        var events = []
        var eventUsers = []
        querySnapshot.forEach(function(doc) {
          // var fireStoreEventsUsersRef = db.collection("events").doc(doc.id).collection('users')
          var event = doc.data();
          event['id'] = doc.id;
          // fireStoreEventsUsersRef.get()
          // .then(function(querySnapshot) {
            // querySnapshot.forEach(function(doc) {
              // eventUsers.push(doc.data())
              // });
            // }).then( () => {
              // event['users'] = eventUsers
              events.push(event);
            // })
        })

        let user = firebase.auth().currentUser

        if (user) {
          firebase.database().ref().child('users').child(user.uid)
                .child('events').once('value', function(snapshot) {
            var userEvents = []

            var dbUserEvents = snapshot.val()

            if(dbUserEvents != undefined) {
              Object.keys(dbUserEvents).map(key =>{
                userEvents.push(dbUserEvents[key])
              })
            }

            events = events.map(event => {
              event['attending'] = userEvents.includes(event.id)
              return event
            })

            dispatch({type: C.UPDATE_EVENTS, events})
          })
        } else{
          dispatch({type: C.UPDATE_EVENTS, events})
        }

        dispatch(userParticipationListener())
      })

  }
}
