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
        var messages = []
        console.log(docMessages)
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

// export function isUserInChat(eventId){
//   console.log(eventId);
//   var userUid = firebase.auth().currentUser.uid
//   console.log(userUid);
//   var db = firebase.firestore()
//   var eventRef = db.collection("events").doc(eventId).collection("users").doc(userUid)
//   eventRef.get().then(function(doc) {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       console.log("No such Event!");
//     }
//   })
//   .catch(function(error) {
//     console.log("Error getting document:", error);
//   });
// }


export function sendMessage(message) {
  return function(dispatch, getState){
    var user = getState().user
    var eventId = getState().event_details.event.id

    if (message.length == 0 || user.currently != AUTH.SIGNED_IN || !eventId)
      return

    var date = new Date()
    var autor = user.username
    if (user.photoUrl) {
      var userPhoto = user.photoUrl
    }else {
      //
      var userPhoto = "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
    }
    firebase.firestore().collection("events").doc(eventId).collection("chat").add({
        message, date, autor, userPhoto
    })
    .then(function(docRef) {
        console.log("Messagee written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
}
