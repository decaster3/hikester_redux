var C = require("../../constants/events_creation/events_creation.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.new_event, action){
  switch(action.type){
    case C.UPDATE_LOCATION:
      return {
        tag: currentstate.tag,
        location: action.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom,
        circle: currentstate.circle,
        suggestedTime: currentstate.suggestedTime,
        suggesterDay: currentstate.suggesterDay
      }
    case C.UPDATE_TAGS:
      return {
        tag: action.tag,
        location: currentstate.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom,
        circle: currentstate.circle,
        suggestedTime: currentstate.suggestedTime,
        suggesterDay: currentstate.suggesterDay
      }
    case C.DRAW_CIRCLE:
      return {
        tag: currentstate.tag,
        location: currentstate.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom,
        circle: {...currentstate.circle, center: action.center, visible: action.visible},
        suggestedTime: currentstate.suggestedTime,
        suggesterDay: currentstate.suggesterDay
      }
    case C.SUGGEST_TIME:
      return {
        tag: currentstate.tag,
        location: currentstate.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom,
        circle: currentstate.circle,
        suggestedTime: action.suggestedTime,
        suggesterDay: currentstate.suggesterDay
      }
    case C.SUGGEST_DAY:
      return {
        tag: currentstate.tag,
        location: currentstate.location,
        defaultCenter: currentstate.defaultCenter,
        defaultZoom: currentstate.defaultZoom,
        circle: currentstate.circle,
        suggestedTime: currentstate.suggestedTime,
        suggestedDay: action.suggestedDay
      }
    default:
      return currentstate;
  }
}
