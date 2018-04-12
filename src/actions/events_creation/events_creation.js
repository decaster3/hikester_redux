import axios from 'axios';
let C = require('../../constants/events_creation/events_creation')
import { routerMiddleware, push } from 'react-router-redux'
import moment from 'moment';
import UIkit from 'uikit';
const firebase = require("firebase");
import { notification_success, notification_error } from '../notification_success'
import { toast } from 'react-toastify';
 require("firebase/firestore");

 const notifyBadConnection = () => toast('Sorry, your evet was marked as spam!', { hideProgressBar: true, autoClose: 10000, type: toast.TYPE.ERROR });


export function updateEventTag(tag, state){
  return function(dispatch) {
    if (!state) {
      tag = null;
    }
    dispatch({type: C.UPDATE_TAGS, tag: tag});
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

function bin2string(array){
 var result = "";
 for(var i = 0; i < array.length; ++i){
  result+= (String.fromCharCode(array[i]));
 }
 return result;
}

export function drawCircle(tag) {
  return function(dispatch) {
    axios.get("http://localhost:8080/circle?tag=" + tag).then((data) => {
      console.log(data.data);
      var center = data.data;
      var visible = true;
      if (!center.lat || !center.lng) {
        visible: false;
      }

      dispatch({type: C.DRAW_CIRCLE, center: center, visible: visible});
    });
  };
}

export function suggestTime(tag) {
  return function(dispatch) {
    axios.get("http://localhost:8080/time?tag=" + tag).then((data) => {
      console.log(data.data);
      const suggestedTime = data.data.suggestedTime;

      dispatch({type: C.SUGGEST_TIME, suggestedTime: suggestedTime});
    });
  };
}

export function suggestDay(tag) {
  return function(dispatch) {
    axios.get("http://localhost:8080/day?tag=" + tag).then((data) => {
      console.log(data.data);
      const suggestedDay = data.data.suggestedDay;

      dispatch({type: C.SUGGEST_DAY, suggestedDay: suggestedDay});
    });
  };
}

export function createNewEvent(address, cost, start_date, end_date, description, lat, lng, name, max_people_count){
  //realtime db
  return function(dispatch,getState) {
  axios.get(`http://89.223.29.212:8005/spam_check/?${name} ${description}`).then((data) => {
    if(data.data == "Spam"){
     notifyBadConnection();
     dispatch(push('/'))
   } else {
     start_date = new Date(start_date.toDate().getTime());
     end_date = new Date(end_date.toDate().getTime());
     let user = firebase.auth().currentUser;

     let creatorEventsRef = firebase.database().ref().child('users').child(user.uid).child('my_events')
     let userAttendsEventsRef = firebase.database().ref().child('users').child(user.uid).child('events')
     //firestore db
     var db = firebase.firestore();
     var fireStoreEventsRef = db.collection("events")

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
               creator: firebase.auth().currentUser.uid,
               lat: getState().new_event.location.lat,
               lng: getState().new_event.location.lng,
               name,
               max_people_count,
               people_in_event: 1,
               spam_counter: 0,
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
  }).catch((err) => {
    console.log(err);
  })
  }
}
