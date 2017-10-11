var C = require("../../constants/notifications/notifications.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.notifications, action){
  switch(action.type){
    case C.LOADING_NOTIFICATIONS:
      return {
        notifications: currentstate.notifications,
        currently: action.currently
      }
    case C.UPDATE_NOTIFICATIONS:
      return {
        currently: action.currently,
        notifications: [...currentstate.notifications, action.notification]
      }
    default:
      return currentstate;
  }
}
