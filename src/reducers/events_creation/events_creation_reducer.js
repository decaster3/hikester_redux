var C = require("../../constants/events_creation/events_creation.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.new_event, action){
  switch(action.type){
    case C.UPDATE_LOCATION:
      return {
        tag: currentstate.tag,
        location: action.location
      }
    case C.UPDATE_TAGS:
      return {
        tag: action.tag,
        location: currentstate.location
      }
    default:
      return currentstate;
  }
}
