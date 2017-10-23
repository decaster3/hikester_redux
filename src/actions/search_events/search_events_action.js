let C = require('../../constants/search_events/search_events')
let USER = require('../../constants/auth/authentication')
let EVENT = require('../../constants/event_details/event_details')
import { startListeningToAuth } from '../auth/authentication_actions'
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

export function scheduleEvent(id) {


  return function(dispatch, getState) {
    let user = firebase.auth().currentUser

    firebase.database().ref().child('users').child(user.uid).child('events').push(id).then(() =>{
      dispatch({type: USER.CHANGE_USER_ATTENDS, newEvent: id})
      //TODO
      dispatch({type: EVENT.ADD_USER_TO_EVENT, currentUser:  getState().user})
    })

    firebase.database().ref().child('users').child(user.uid).once("value", user => {
      var userFromDB = user.val()
      userFromDB["uid"] = user.key
      firebase.firestore().collection("events").doc(id).collection("users").doc(user.uid).set(
        userFromDB
      )
    })
  }
}

export function updateEventTagSearch(tag, state){
  return function(dispatch, getState) {
    if (state == false)
      tag = null

    dispatch({type: C.UPDATE_TAGS_SEARCH, tag})
    dispatch(startListeningEvents())
  }
}

export function chanageFilters(start_date, end_date){
  let fields = {
    start_date: new Date(start_date.toDate().getTime()),
    end_date: new Date(end_date.toDate().getTime())
  }
  return function(dispatch) {

    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields})
    dispatch(startListeningEvents())
  }
}
export function clearFilters(){
  let tag = null
  let fields = {
    from: null,
    to: null,
    name: null,
    start_date: null,
    end_date: null
  }
  return function(dispatch) {
    dispatch({type: C.UPDATE_TAGS_SEARCH, tag})
    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields})
    dispatch(startListeningEvents())
  }
  //  dispatch(startListeningEvents())
}

export function updateEventLocationSearch(location){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION_SEARCH, location})
  }
}
export function updateCostFilters(from, to){
  return function(dispatch){
    dispatch({type: C.UPDATE_COST, from: from, to: to})
    dispatch(startListeningEvents())
  }
}
export function updateNameFilters(name){
  return function(dispatch){
    dispatch({type: C.UPDATE_NAME, name: name})
    dispatch(startListeningEvents())
  }
}
export function userParticipationListener(events, uid) {
  return function(dispatch, getState){

      firebase.database().ref().child('users').child(uid).child('events').once('value', function(snapshot) {
        var userEvents = []
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

export function startListeningEvents(){
  var db = firebase.firestore();
  var fireStoreEventsRef = db.collection("events")

  return function(dispatch, getState) {
    var { tag, start_date, end_date, name } = getState().search_events;

    if (tag)
      fireStoreEventsRef = fireStoreEventsRef.where("tag", "==", tag);

    if (name)
      fireStoreEventsRef = fireStoreEventsRef.where("name", "==", name)

    if (start_date)
      fireStoreEventsRef = fireStoreEventsRef.where("start_date", ">", start_date)

    if (end_date)
      fireStoreEventsRef = fireStoreEventsRef.where("start_date", "<", end_date)



    fireStoreEventsRef.onSnapshot(function(querySnapshot) {
      var events = [];
      //cost filter
      if(getState().search_events.costFrom != null && getState().search_events.costTo != null) {
        querySnapshot.forEach(function(doc){
          var event = doc.data();
          if(parseInt(event.cost) > getState().search_events.costFrom && parseInt(event.cost) < getState().search_events.costTo){
            event['id'] = doc.id;
            events.push(event);
          }
        })
      }else {
        querySnapshot.forEach(function(doc) {
          var event = doc.data();
          event['id'] = doc.id;
          events.push(event);
        });
      }
      let user = firebase.auth().currentUser;

      if (tag)
        sendLog(events, getState().user, tag, "search");

      if (user) {
        dispatch(userParticipationListener(events, user.uid));
      } else {
        dispatch({type: C.UPDATE_EVENTS, events});
      }
    })
  }
}

function sendLog(events, user, tag, type) {
  if (!user)
    return;

  var user_id = user.id;
  var logRef = firebase.database().ref().child("ann_logs");

  events.map(event => {

    var duration = moment(event.end_date).unix() - moment(event.start_date).unix();
    duration = duration / (60 * 60);

    var time = moment(event.start_time).format("HH:mm");

    var log = {
      duration,
      time,
      tag,
      type,
      user_id
    }
    logRef.push(log);
  });
}
