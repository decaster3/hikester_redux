const firebase = require("firebase");
 require("firebase/firestore");
import React, { Component } from 'react'
let C = require('../../constants/notifications/notifications')

export function getNotifications(){
  return function(dispatch){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var a = false
      let newNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('new')
      let oldNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('old')
      newNotificationsRef.once('value', function(snapshot) {
        if (snapshot.val() != null){
          a = true
          oldNotificationsRef.update(
            snapshot.val()
          )
        }
        if (a){
          newNotificationsRef.remove()
          a = false
        }
      }).then( () => {
        var eventsIds = []
        let notificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('old')
        notificationsRef.once('value', function(snapshot){
          Object.keys(snapshot.val()).map((key) =>{
            eventsIds.push(snapshot.val()[key])
          })
        }).then( () => {
          console.log(eventsIds);
          var db = firebase.firestore();
          var eventView = {}
          eventsIds.map((eventId) => {
            var fireStoreEventRef = db.collection("events").doc(eventId)
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
          })
        })
      })
    }
  })
}
}