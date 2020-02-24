import {
  SET_RECOMMENDED_USERS,
  SET_CURRENT_USER,
  SET_ERROR,
  SET_LOADING,
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
  recommendedUsers: [],
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
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
