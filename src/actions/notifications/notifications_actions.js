const firebase = require("firebase");
 require("firebase/firestore");
import React, { Component } from 'react'
let C = require('../../constants/notifications/notifications')

export function fromIdToEvent(id){
  var db = firebase.firestore();
  var eventView = {}

  return function(dispatch) {
  var fireStoreEventRef = db.collection("events").doc(id)
  fireStoreEventRef.get().then(function(doc) {
    if (doc.exists){
        eventView = {
          address: doc.data().address,
          cost: doc.data().cost,
          end_time: doc.data().end_time,
          start_time: doc.data().start_time,
          description: doc.data().description,
          lat: doc.data().lat,
          lng: doc.data().lng,
          name: doc.data().name,
          max_people_count: doc.data().max_people_count,
          start_date: doc.data().start_datee,
          tag: doc.data().tag
        }
      }
      else {
        console.log("No such document!");
      }
    }).then( () => {
      dispatch({type: C.UPDATE_NOTIFICATIONS, notification: eventView})
    })
}
}
export function fromRelevantToOld(){
  var a = false
  var user = firebase.auth().currentUser
    let newNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('new')
    let oldNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('old')
    newNotificationsRef.once('value').then(function(snapshot) {
      console.log(snapshot.val());
      if (snapshot != null){
        a = true
        oldNotificationsRef.update(
          snapshot.val()
        )
      }
    })
    if (a){
      newNotificationsRef.remove()
    }
}
