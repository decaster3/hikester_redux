import * as firebase from 'firebase';
let C = require("../../constants/auth/authentication.js")
import { updateVerificationProcent } from '../profile/profile_settings_action'

	// вызывается при инициализации приложения, затем слушает на изменения
	export function startListeningToAuth(){
		return function(dispatch,getState){
			firebase.auth().onAuthStateChanged(function(user) {
				if (user){
					updateVerificationProcent()
					let authRef = firebase.database().ref().child('users').child(user.uid)
					// let newNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('new')
					// let oldNotificationsRef = firebase.database().ref().child('users').child(user.uid).child('notifications').child('old')
					// //подгрузка данных из базы данных профиля пользователя
					authRef.update({
						emailVerified: user.emailVerified,
						photoUrl: user.photoURL
					})

					authRef.on('value', function(snapshot){
						dispatch({
							type: C.SIGNIN_USER,
							uid: snapshot.key,
							default_country: snapshot.val().default_country,
							default_city: snapshot.val().default_city,
							authProviders: snapshot.val().authProviders,
							email: snapshot.val().email,
							phone: snapshot.val().phoneNumber,
							addresses: snapshot.val().addresses,
							phoneVerified: snapshot.val().phoneVerified,
							emailVerified: snapshot.val().emailVerified,
							username: snapshot.val().username,
							events: snapshot.val().events,
							myEvents: snapshot.val().my_events,
							verificationProcent: snapshot.val().verificationProcent,
							notifications: snapshot.val().notifications,
							photoUrl: snapshot.val().photoUrl
						});
					})
				} else {
					if (getState().user.currently !== C.ANONYMOUS){ // иногда выбрасывал что залогинен, хотя не был, хз почему, это костыль
						dispatch({type:C.LOGOUT});
					}
				}
			});
		}
	}

	export function facebookSignin(){
    let provider = new firebase.auth.FacebookAuthProvider();
		let authRef = firebase.database().ref().child('users')
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
      firebase.auth().signInWithPopup(provider).then(function(result) {
      }).then(() => {
				var user = firebase.auth().currentUser
				//добавление информации в профиль пользователя в бд
				authRef.once('value')
					.then(function(snapshot){
							authRef.child(user.uid).update({
								username: user.displayName,
								email: user.email
							})
							//отправление верификации почты, только в первый раз, нужно протестировать
							firebase.auth().onAuthStateChanged(function(user) {
								if(!user.emailVerified){
									user.sendEmailVerification().then(function() {
									  console.log("email sent");
									}).catch(function(error) {
									  console.log(error.message);
									});
								}
							})
					})
			})
			.then(() => {
				var user = firebase.auth().currentUser
				var isPhoneVerify = false
				if (user.phoneNumber != null){
					isPhoneVerify = true
				}
				let authRef = firebase.database().ref().child('users').child(user.uid)
				authRef.update({
					emailVerified: user.emailVerified,
					phoneVerified: isPhoneVerify,
					authProviders: user.providerData,
					phoneNumber: user.phoneNumber || ''
				})
			}).catch(function(error) {
        console.log(error)
        dispatch({type:C.LOGOUT})
        })
		}
	}
	export function phoneVerify(){

	}

	export function emailVerify(){
		var user = firebase.auth().currentUser
		firebase.auth().onAuthStateChanged(function(user) {
				user.sendEmailVerification();
		})
	}

	export function googleSignin(){
		let authRef = firebase.database().ref().child('users')
		let provider = new firebase.auth.GoogleAuthProvider();
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
			firebase.auth().signInWithPopup(provider).then(function(result) {
			}).then(() => {
				var user = firebase.auth().currentUser
				//добавление информации в профиль пользователя в бд
				authRef.once('value')
					.then(function(snapshot){
							authRef.child(user.uid).update({
								username: user.displayName,
								email: user.email
							})
					})
			})
			.then(() => {
				var user = firebase.auth().currentUser
				var isPhoneVerify = false
				if (user.phoneNumber != null){
					isPhoneVerify = true
				}
				let authRef = firebase.database().ref().child('users').child(user.uid)
				authRef.update({
					emailVerified: user.emailVerified,
					phoneVerified: isPhoneVerify,
					authProviders: user.providerData,
					phoneNumber: user.phoneNumber || ''
				}).catch(function(error) {
				console.log(error)
				dispatch({type:C.LOGOUT})
				})
		})
	}
}

	export function passwordSignin(email,pass){
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
			firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorMessage);
			});
		}
	}

	export function passwordSignup(email,name,lastName,pass){
		let authRef = firebase.database().ref().child('users')
		return function(dispatch){
			dispatch({type:C.ATTEMPTING})
				firebase.auth().createUserWithEmailAndPassword(email, pass).then(() => {
					//отправление письма и запись в бд при регистрации
					var user = firebase.auth().currentUser
					firebase.auth().onAuthStateChanged(function(user) {
						user.sendEmailVerification()
					})
					authRef.once('value')
						.then(function(snapshot){
								authRef.child(user.uid).update({
									username: name + " " + lastName,
									email: user.email
								})
						})
				}).then(() => {
								var user = firebase.auth().currentUser
								var isPhoneVerify = false
								if (user.phoneNumber != null){
									isPhoneVerify = true
								}
								let authRef = firebase.database().ref().child('users').child(user.uid)
								authRef.update({
									emailVerified: user.emailVerified,
									phoneVerified: isPhoneVerify,
									authProviders: user.providerData,
									phoneNumber: user.phoneNumber || ''
								}).catch(function(error) {
								console.log(error)
								dispatch({type:C.LOGOUT})
								})
						}).catch(function(error) {
					dispatch({type:C.LOGOUT})
				});
		}
	}

	export function logoutUser(){
		return function(dispatch){
			dispatch({type:C.LOGOUT});
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
		}
	}
