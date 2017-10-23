let C = require("../../constants/auth/authentication.js");
let initialState = require("./initial_state_user.js");

module.exports = function(currentstate = initialState.auth,action){
  switch(action.type){
    case C.ATTEMPTING:
      return {
        currently: C.AWAITING,
        emailVerified: false,
        phoneVerified: false,
        username: "guest",
        uid: null
      };
    case C.LOGOUT:
      return {
        currently: C.ANONYMOUS,
        emailVerified: false,
        phoneVerified: false,
        username: "guest",
        uid: null
      };
    case C.SIGNIN_USER:
      return {
        currently: C.SIGNED_IN,
        email: action.email,
        phone: action.phone,
        default_country: action.default_country,
        default_city: action.default_city,
        username: action.username,
        addresses: action.addresses,
        authProviders: action.authProviders,
        emailVerified: action.emailVerified,
        phoneVerified: action.phoneVerified,
        events: action.events,
        myEvents: action.myEvents,
        uid: action.uid,
        verificationProcent: action.verificationProcent,
        notifications: action.notifications,
        photoUrl: action.photoUrl,
        about: action.about,
        sex: action.sex,
        id: action.id
      };
    case C.CHANGE_USER_ATTENDS:
      var event = {};
      console.log(action.key);
      event[action.key] = action.newEvent;
      console.log(event);
      return {
        ...currentstate,
        events: [...currentstate.events, event]

      }
    default: return currentstate;
  }
}
