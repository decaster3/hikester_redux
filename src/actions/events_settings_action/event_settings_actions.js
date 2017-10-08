let C = require('../../constants/events_settings/events_settings')
export function setEventsSettingsCategory(category){
  return function(dispatch) {
    dispatch({type: C.EVENT_SETTINGS_CATEGORY_SELECTED, category: category})
  }
}
