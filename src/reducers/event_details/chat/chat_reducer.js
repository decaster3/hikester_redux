let C = require("../../../constants/chat/chat.js");
let initialState = require("./initial_state.js");

module.exports = function(currentstate = initialState, action){
  switch(action.type){
    case C.LOAD_CHAT:
      return {
        state: C.LOADED,
        messages: action.messages
      };
    case C.LOADING_CHAT:
      return {
        state: C.LOADING,
        messages: currentstate.messages
      };
    default: return currentstate;
  }
}
