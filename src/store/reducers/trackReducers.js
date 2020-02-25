import { PLAY_ALL, PAUSE_ALL, STOP_ALL, PUSH_LOADEDTRACK, CLEAR_TRACKS } from '../actions'

const initialState = {
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  loadedTracks: [],
}

function trackReducers(state = initialState, action) {
  switch (action.type) {
    case PLAY_ALL:
      return {
        ...state,
        isPlaying: action.payload,
      }
    case PAUSE_ALL:
      return {
        ...state,
        isPaused: action.payload,
      }
    case STOP_ALL:
      return {
        ...state,
        isStopped: action.payload,
        isPlaying: false,
      }
    case PUSH_LOADEDTRACK:
      return {
        ...state,
        loadedTracks: [action.payload, ...state.loadedTracks],
      }
    case CLEAR_TRACKS:
      return {
        ...state,
        loadedTracks: [],
      }
    default:
      return state
  }
}

export default trackReducers
