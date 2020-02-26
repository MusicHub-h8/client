import {
  SET_RECOMMENDED_USERS,
  SET_CURRENT_USER,
  SET_ERROR_USER,
  SET_LOADING_USER,
  DELETE_INVITE,
} from '../actions';

const currentUserOnLocalStorage = JSON.parse(
  localStorage.getItem('currentUser')
);

const initialState = {
  currentUser: currentUserOnLocalStorage || {
    pendingInvites: [],
    instruments: [],
  },
  loading: false,
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECOMMENDED_USERS:
      return {
        ...state,
        recommendedUsers: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case DELETE_INVITE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          pendingInvites: state.currentUser.pendingInvites.filter(
            invite => invite._id !== action.payload
          ),
        },
      };
    case SET_ERROR_USER:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
