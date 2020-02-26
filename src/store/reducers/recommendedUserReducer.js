import {
  SET_RECOMMENDED_USERS,
  SET_LOADING_RECOMMENDED_USERS,
  SET_ERROR_RECOMMENDED_USERS,
} from '../actions';

const initialState = {
  recommendedUsers: [],
  loading: false,
  error: null,
};

function recommendedUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECOMMENDED_USERS:
      return {
        ...state,
        recommendedUsers: action.payload,
      };
    case SET_LOADING_RECOMMENDED_USERS:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR_RECOMMENDED_USERS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default recommendedUserReducer;
