import { GET_MYROOMS } from '../actions/'

const initialState = {
  myRooms: [],
}

export default function roomReducers(state = initialState, action) {
  switch (action.type) {
    case GET_MYROOMS:
      return {
        ...state,
        states: action.payload,
      }
    default:
      return state
  }
}
