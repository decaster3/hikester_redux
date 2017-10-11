const firebase = require("firebase")
require("firebase/firestore")
let AUTH = require("../../constants/auth/authentication.js")
let C = require("../../constants/chat/chat.js")

export function loadMessages() {
  return function(dispatch, getState){

    var eventId = getState().event_details.event.id
    if (!eventId)
      return

    dispatch({type: C.LOADING_CHAT})

    var db = firebase.firestore()
    var messagesRef = db.collection("events").doc(eventId).collection("chat").orderBy("date", "desc")

    messagesRef.onSnapshot(docMessages => {
        console.log(123);
        var messages = []
        docMessages.forEach(function(doc) {
          messages.push(doc.data());
        });
        dispatch({
          type: C.LOAD_CHAT,
          messages,
          eventId
        })

    }, err => {
        console.log(`Encountered error: ${err}`);
    });

  }
}


export function sendMessage(message) {
  return function(dispatch, getState){
    var user = getState().user
    var eventId = getState().chat.eventId

    if (message.length == 0 || user.currently != AUTH.SIGNED_IN || !eventId)
      return

    var date = new Date()
    var autor = user.username

    firebase.firestore().collection("events").doc(eventId).collection("chat").add({
        message, date, autor
    })
    .then(function(docRef) {
        console.log("Messagee written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
