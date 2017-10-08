import React, { Component } from 'react'
import MainAuthComponent from './auth_page/main_auth_component'
import MainProfileComponent from './profile_page/main_profile_component'
import { Link } from 'react-router-dom'

export default class App extends Component {
  componentDidMount(){
    const firebase = require("firebase");
      require("firebase/firestore");
    var db = firebase.firestore();
    var eventsRef = db.collection("events");
    eventsRef.add({
      name: "Birthday",
      sport: true,
      fun: true,
      location: "kazan"
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        db.collection("events")
        .where("name", "==", "Birthday")
        .where("sport", "==", true)
        .where("fun","==",true)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }
  render() {
    return (
      <div>
        <Link to = "/profile">Профиль</Link>
        <Link to = "/auth">Аутенитификация</Link>
      </div>
    );
  }
}
