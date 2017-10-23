var C = require("../../constants/search_events/search_events.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.new_event, action){
  switch(action.type){
    case C.UPDATE_LOCATION_SEARCH:
      return {
        ...currentstate,
        currently: "NOT_LOADED",
        location: action.location
      }
    case C.UPDATE_TAGS_SEARCH:
      return {
        ...currentstate,
        tag: action.tag,
        currently: "NOT_LOADED"
      }
    case C.UPDATE_EVENTS:
      return {
        ...currentstate,
        currently: "LOADED",
        events: action.events
      }
    case C.CHANGE_USER_ATTENDANT_STATE:
      var events = currentstate.events.map( event => {
        event = Object.assign({}, event);
        if (event.id == action.eventId) {
          event.attending = action.attending;
        }
        return event;
      });
      return {
        ...currentstate,
        events
      }
    case C.UPDATE_FIELDS_SEARCH:
      return {
        ...currentstate,
        currently: "NOT_LOADED",
        start_date: action.fields.start_date,
        end_date: action.fields.end_date,
        cost: action.fields.cost
      }
    default:
      return currentstate;
  }
}
