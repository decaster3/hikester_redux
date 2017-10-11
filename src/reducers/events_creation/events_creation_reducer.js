var C = require("../../constants/events_creation/events_creation.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.new_event, action){
  switch(action.type){
    case C.UPDATE_LOCATION:
      return {
        tag: currentstate.tag,
        location: action.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom
      }
    case C.UPDATE_TAGS:
      return {
        tag: action.tag,
        location: currentstate.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom
      }
    default:
      return currentstate;
  }
}
