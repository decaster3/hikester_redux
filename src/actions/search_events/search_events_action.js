let C = require('../../constants/search_events/search_events')
import moment from 'moment';
const firebase = require("firebase");
 require("firebase/firestore");

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
    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields: fields})
  }
}
export function clearFilters(){
  let fields = {
    cost: null,
    start_date: null,
    end_date: null
  }
  return function(dispatch) {
    dispatch({type: C.UPDATE_FIELDS_SEARCH, fields: fields})
  }
}

export function updateEventLocationSearch(location){
  return function(dispatch) {
    dispatch({type: C.UPDATE_LOCATION_SEARCH, location: location})
  }
}


export function startListeningEvents(){
  var db = firebase.firestore();
  var fireStoreEventsRef = db.collection("events")
  var events = []
  return function(dispatch, getState){
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
            events.push(doc.data());
      })
      dispatch({type: C.UPDATE_EVENTS, events: events})
    })
  }
}
