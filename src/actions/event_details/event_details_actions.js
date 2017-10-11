const firebase = require("firebase")
require("firebase/firestore")
let C = require("../../constants/event_details/event_details.js")

export function loadEvent(id) {
  return function(dispatch, getState){

    if (!id)
      return

    dispatch({type: C.LOADING_EVENT})
    
    firebase.firestore().collection("events").doc(id).get().then(function(doc) {
        if (doc.exists) {
            var event = doc.data()
            event["id"] = id
            dispatch({
              type: C.LOAD_EVENT,
              event
            })
        } else {
            console.log("No such document!")
            dispatch({ type: C.ERROR })
        }
    }).catch(function(error) {
        console.log("Error getting document:", error)
        dispatch({ type: C.ERROR })
    });
  }
}
