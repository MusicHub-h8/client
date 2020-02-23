import { combineReducers } from 'redux';

import trackReducer from './trackReducers';
import roomReducer from './roomReducers';
import userReducer from './userReducer';

export default combineReducers({
  // trackReducer,
  roomReducer,
  userReducer,
});
