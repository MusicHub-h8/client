import {
  SET_ALL_USERS,
  SET_LOADING_ALL_USERS,
  SET_ERROR_ALL_USERS,
} from '../actions';

const initialState = {
  allUsers: [],
  loading: false,
  error: null,
};

function allUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case SET_LOADING_ALL_USERS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR_ALL_USERS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default allUserReducer;
