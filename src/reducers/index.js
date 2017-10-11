import { combineReducers } from 'redux';
import AuthReducer from './auth/auth_reducer'
import ChatReducer from './event_details/chat/chat_reducer'
import PhoneReducer from './auth/phone_reducer'
import profileSettingsReducer from './profile/profile_settings_reducer'
import EventsSettingsReducer from './events_settings/events_settings_reducer'
import EventsCreationReducer from './events_creation/events_creation_reducer'
import SearchEventsReducer from './search_events/search_events_reducer'
import NotificationsReducer from './notifications/notifications_reducer'
import EventDetails from './event_details/event_details/event_details_reducer'

const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer,
  events_settings: EventsSettingsReducer,
  profile_settings: profileSettingsReducer,
  new_event: EventsCreationReducer,
  search_events: SearchEventsReducer,
  notifications: NotificationsReducer,
  event_details: EventDetails,
  chat: ChatReducer
});

export default rootReducer;
