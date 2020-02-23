import { GET_MYROOMS, ADD_ROOM, SET_LOADING, SET_ERROR } from '../actions/';

const initialState = {
  myRooms: {
    owned: [],
    involved: [],
  },
  loading: false,
  error: null,
};

export default function roomReducers(state = initialState, action) {
  switch (action.type) {
    case GET_MYROOMS:
      return {
        ...state,
        myRooms: {
          owned: action.payload.owned,
          involved: action.payload.involved,
        },
      };
    case ADD_ROOM:
      return {
        ...state,
        myRooms: {
          ...state.myRooms,
          owned: [action.payload, ...state.myRooms.owned],
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
