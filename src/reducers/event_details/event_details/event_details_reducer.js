let C = require("../../../constants/event_details/event_details.js");
let initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState, action){

  switch(action.type){
    case C.LOAD_EVENT:
      return {
        state: C.LOADED,
        event: action.event
      };
    case C.LOADING_EVENT:
      return {
        state: C.LOADING,
        event: currentstate.event
      };
    case C.EVENT_ERROR:
      return {
        state: C.ERROR
      };
    default: return currentstate;
  }
}
