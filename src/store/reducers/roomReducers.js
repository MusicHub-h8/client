import {
  GET_MYROOMS,
  ADD_ROOM,
  GET_ROOMDETAILS,
  ADD_TRACK,
  SET_LOADING_ROOM,
  SET_ERROR_ROOM,
  DELETE_TRACK,
  CLEAR_TRACKS,
} from '../actions/';

const initialState = {
  myRooms: {
    owned: [],
    involved: [],
  },
  loading: false,
  error: null,
  activeRoom: {
    tracks: [],
    detail: {
      userIds: [],
    },
  },
};

export default function roomReducers(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMDETAILS:
      return {
        ...state,
        activeRoom: action.payload,
      };
    case GET_MYROOMS:
      return {
        ...state,
        myRooms: {
          owned: action.payload.owned,
          involved: action.payload.involved,
        },
      };
    case ADD_TRACK:
      return {
        ...state,
        activeRoom: {
          detail: state.activeRoom.detail,
          tracks: [...state.activeRoom.tracks, action.payload],
        },
      };
    case DELETE_TRACK:
      const newTracks = state.activeRoom.tracks.filter(track => {
        return track._id !== action.payload;
      });
      return {
        ...state,
        activeRoom: {
          detail: state.activeRoom.detail,
          tracks: newTracks,
        },
      };
    case CLEAR_TRACKS:
      return {
        ...state,
        activeRoom: initialState.activeRoom,
      };
    case ADD_ROOM:
      return {
        ...state,
        myRooms: {
          ...state.myRooms,
          owned: [action.payload, ...state.myRooms.owned],
        },
      };
    case SET_ERROR_ROOM:
      return {
        ...state,
        error: action.payload,
      };
    case SET_LOADING_ROOM:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
