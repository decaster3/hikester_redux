var C = require("../../constants/events_settings/events_settings.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.event_settings, action){
  switch(action.type){
    case C.EVENT_SETTINGS_CATEGORY_SELECTED:
      return {
        events_settings_category: action.category
      }
    default:
      return currentstate;
  }
}
