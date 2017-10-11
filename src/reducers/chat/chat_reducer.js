let C = require("../../constants/chat/chat.js");
let initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState, action){
  switch(action.type){
    case C.LOAD:
      return {
        currently: C.LOADED,
        messages: action.messages,
        eventId: action.eventId
      };
    default: return currentstate;
  }
}
