const firebase = require("firebase")
require("firebase/firestore")
let C = require("../../constants/event_details/event_details.js")

export function loadEvent(id) {
  return function(dispatch, getState){

    if (!id)
      return

    dispatch({type: C.LOADING_EVENT})

    firebase.firestore().collection("events").doc(id).onSnapshot(function(doc) {
        var db = firebase.firestore();
        if (doc.exists) {
            var eventUsers = []
            var fireStoreEventsUsersRef = db.collection("events").doc(id).collection('users')
            fireStoreEventsUsersRef.get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                var user = doc.data()
                  eventUsers.push(user)
                });

                var {uid} = firebase.auth().currentUser || {uid: ""}
                var event = doc.data()
                event["id"] = id
                event['users'] = eventUsers

                var attending = false
                for (var i = 0; i < eventUsers.length; i++) {
                  if (eventUsers[i].uid == uid){
                    attending = true
                    break
                  }
                }

                event['attending'] = attending
                dispatch({
                  type: C.LOAD_EVENT,
                  event
                })
              })
        } else {
            console.log("No such document!")
            dispatch({ type: C.ERROR })
        }
    })
  }
}

export function loadPhoto(ref, filename) {
  return function(dispatch, getState){
    firebase.storage().ref(ref).child(filename).getDownloadURL()
      .then(photoURL => {
        var id = getState().event_details.event.id;
        firebase.firestore().collection('events').doc(id).update({photoUrl: photoURL});
      });
  }
}
