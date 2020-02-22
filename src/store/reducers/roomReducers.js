import { GET_MYROOMS, ADD_ROOM } from '../actions/'

const initialState = {
  myRooms: {
    owned: [],
    involved: [],
  },
  loading: false,
  error: null,
  activeRoom: {},
}

export default function roomReducers(state = initialState, action) {
  switch (action.type) {
    case GET_MYROOMS:
      return {
        ...state,
        myRooms: {
          owned: action.payload.owned,
          involved: action.payload.involved,
        },
      }
    case ADD_ROOM:
      return {
        ...state,
        myRooms: {
          ...state.myRooms,
          owned: [action.payload, ...state.myRooms.owned],
        },
      }
    default:
      return state
  }
}
