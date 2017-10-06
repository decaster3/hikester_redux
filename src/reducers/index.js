import { combineReducers } from 'redux';
import AuthReducer from './auth/auth_reducer'
import PhoneReducer from './auth/phone_reducer'
import profileSettingsReducer from './profile/profile_settings_reducer'

const rootReducer = combineReducers({
  user: AuthReducer,
  phone: PhoneReducer,
  profile_settings: profileSettingsReducer
});

export default rootReducer;
