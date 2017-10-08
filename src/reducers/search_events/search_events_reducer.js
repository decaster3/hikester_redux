var C = require("../../constants/search_events/search_events.js");
var initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState.new_event, action){
  switch(action.type){
    case C.UPDATE_LOCATION_SEARCH:
      return {
        tag: currentstate.tag,
        location: action.location,
        events: currentstate.events,
        start_date: currentstate.start_date,
        end_date: currentstate.end_date,
        cost: currentstate.cost
      }
    case C.UPDATE_TAGS_SEARCH:
      return {
        tag: action.tag,
        events: currentstate.events,
        location: currentstate.location,
        start_date: currentstate.start_date,
        end_date: currentstate.end_date,
        cost: currentstate.cost
      }
    case C.UPDATE_EVENTS:
      return {
        tag: currentstate.tag,
        location: currentstate.location,
        events: action.events,
        start_date: currentstate.start_date,
        end_date: currentstate.end_date,
        cost: currentstate.cost
      }
    case C.UPDATE_FIELDS_SEARCH:
    console.log(action.fields);
      return {
        tag: currentstate.tag,
        location: currentstate.location,
        events: currentstate.events,
        start_date: action.fields.start_date,
        end_date: action.fields.end_date,
        cost: action.fields.cost
      }
    default:
      return currentstate;
  }
}
