const firebase = require("firebase")
require("firebase/firestore")
let AUTH = require("../../constants/auth/authentication.js")
let C = require("../../constants/chat/chat.js")

export function loadMessages(eventId) {
  return function(dispatch, getState){
    if (!eventId)
      return

    var db = firebase.firestore()
    var messagesRef = db.collection("events").doc(eventId).collection("chat").orderBy("date", "desc")

    messagesRef.onSnapshot(docMessages => {
        var messages = []
        docMessages.forEach(function(doc) {
          messages.push(doc.data());

        });
        console.log(1);
        dispatch({
          type: C.LOAD,
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
