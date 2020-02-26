import { combineReducers } from 'redux';

import trackReducer from './trackReducers';
import roomReducer from './roomReducers';
import userReducer from './userReducer';
import allUserReducer from './allUserReducer';
import recommendedUserReducer from './recommendedUserReducer';

export default combineReducers({
  trackReducer,
  roomReducer,
  userReducer,
  allUserReducer,
  recommendedUserReducer,
});
