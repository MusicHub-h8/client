import axios from '../../api/axiosInstance';

export const GET_MYROOMS = 'GET_MYROOMS';
export const ADD_ROOM = 'ADD_ROOM';
export const SET_LOADING_USER = 'SET_LOADING_USER';
export const SET_ERROR_USER = 'SET_ERROR_USER';
export const SET_LOADING_ALL_USERS = 'SET_LOADING_ALL_USER';
export const SET_ERROR_ALL_USERS = 'SET_ERROR_ALL_USER';
export const SET_LOADING_RECOMMENDED_USERS = 'SET_LOADING_RECOMMENDED_USER';
export const SET_ERROR_RECOMMENDED_USERS = 'SET_ERROR_RECOMMENDED_USER';
export const SET_LOADING_ROOM = 'SET_LOADING_ROOM';
export const SET_ERROR_ROOM = 'SET_ERROR_ROOM';
export const GET_TRACKS = 'GET_TRACKS';
export const GET_ROOMDETAILS = 'GET_ROOMDETAILS';
export const SET_RECOMMENDED_USERS = 'SET_RECOMMENDED_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const DELETE_INVITE = 'DELETE_INVITES';
export const SET_ALL_USERS = 'SET_ALL_USERS';
export const DELETE_TRACK = 'DELETE_TRACK';
export const ADD_TRACK = 'ADD_TRACK';

// ACTIONS FOR PLAYBACKS
export const PUSH_LOADEDTRACK = 'PUSH_LOADEDTRACK';
export const pushTrack = trackId => {
  return {
    type: PUSH_LOADEDTRACK,
    payload: trackId,
  };
};
export const PLAY_ALL = 'PLAY_ALL';
export const triggerPlay = currentStatus => {
  return {
    type: PLAY_ALL,
    payload: currentStatus,
  };
};

export const PAUSE_ALL = 'PAUSE_ALL';
export const triggerPause = currentStatus => {
  return {
    type: PAUSE_ALL,
    payload: currentStatus,
  };
};

export const STOP_ALL = 'STOP_ALL';
export const triggerStop = currentStatus => {
  return {
    type: STOP_ALL,
    payload: currentStatus,
  };
};

export const CLEAR_TRACKS = 'CLEAR_TRACKS';
export const clearTracks = () => {
  return {
    type: CLEAR_TRACKS,
    payload: [],
  };
};

// request => hit server
// recieve => dispatch reducer

export const requestAddTrack = trackInfo => {
  const access_token = localStorage.getItem('access_token');
  const { instrument, selectedFile, roomId } = trackInfo;
  return dispatch => {
    const url = `/tracks/${roomId}`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        access_token,
      },
    };
    let formData = new FormData();
    formData.append('instrument', instrument);
    formData.append('track', selectedFile);
    console.log(trackInfo);
    console.log(url);
    console.log(config);
    axios
      .post(url, formData, config)
      .then(({ data }) => {
        console.log('sukses upload!');
        dispatch(addTrack(data));
      })
      .catch(err => {
        console.log('---------------------------------');
        console.log(err.response);
      });
  };
};

export const addTrack = trackDetail => {
  return {
    type: ADD_TRACK,
    payload: trackDetail,
  };
};
export const removeTrack = deletedTrackId => {
  return {
    type: DELETE_TRACK,
    payload: deletedTrackId,
  };
};
export const requestDeleteTrack = trackId => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'DELETE',
      url: `/tracks/${trackId}`,
      headers: {
        access_token,
      },
    })
      .then(() => {
        dispatch(removeTrack(trackId));
      })
      .catch(console.log);
  };
};
export const setActiveRoom = roomDetail => {
  return {
    type: GET_ROOMDETAILS,
    payload: roomDetail,
  };
};

export const setAllUsers = users => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};
export const requestRoomDetail = roomId => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'GET',
      url: `/rooms/${roomId}`,
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(setActiveRoom(data));
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };
};

export const getRooms = rooms => {
  return {
    type: GET_MYROOMS,
    payload: rooms,
  };
};

export const requestRooms = () => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'GET',
      url: '/rooms/me',
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(setLoadingRoom(false));
        dispatch(getRooms(data));
      })
      .catch(console.log);
  };
};

export const addRoom = room => {
  return {
    type: ADD_ROOM,
    payload: room,
  };
};

export const requestAddRoom = room => {
  const { music_title, description, access_token } = room;
  return dispatch => {
    axios({
      method: 'POST',
      url: '/rooms',
      data: {
        music_title,
        description,
      },
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(addRoom(data));
      })
      .catch(console.log);
  };
};

export const setLoadingUser = value => {
  return {
    type: SET_LOADING_USER,
    payload: value,
  };
};

export const setErrorUser = err => {
  return {
    type: SET_ERROR_USER,
    payload: err,
  };
};

export const setLoadingAllUsers = value => {
  return {
    type: SET_LOADING_ALL_USERS,
    payload: value,
  };
};

export const setErrorAllUsers = err => {
  return {
    type: SET_ERROR_ALL_USERS,
    payload: err,
  };
};

export const setLoadingRecommendedUsers = value => {
  return {
    type: SET_LOADING_RECOMMENDED_USERS,
    payload: value,
  };
};

export const setErrorRecommendedUsers = err => {
  return {
    type: SET_ERROR_RECOMMENDED_USERS,
    payload: err,
  };
};

export const setLoadingRoom = value => {
  return {
    type: SET_LOADING_ROOM,
    payload: value,
  };
};

export const setErrorRoom = err => {
  return {
    type: SET_ERROR_ROOM,
    payload: err,
  };
};

export const setRecommendedUsers = recommendedUsers => {
  return {
    type: SET_RECOMMENDED_USERS,
    payload: recommendedUsers,
  };
};

export const requestRecommendedUsers = () => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'GET',
      url: '/users/recommendations',
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(setLoadingRecommendedUsers(false));
        dispatch(setRecommendedUsers(data));
      })
      .catch(console.log);
  };
};

export const setCurrentUser = currentUser => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
};

export const requestCurrentUser = () => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'GET',
      url: '/users/me',
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        console.log(data, 'dataneh');
        dispatch(setLoadingUser(false));
        dispatch(setCurrentUser(data));
      })
      .catch(console.log);
  };
};

export const deleteInvite = roomId => {
  return {
    type: DELETE_INVITE,
    payload: roomId,
  };
};

export const requestAcceptInvitation = (roomId, userId) => {
  const access_token = localStorage.getItem('access_token');
  return dispatch => {
    axios({
      method: 'PATCH',
      url: `/rooms/${roomId}/invite/${userId}`,
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        dispatch(deleteInvite(roomId));
        dispatch(requestRooms());
        console.log(data, 'dari requestAcceptInvitation');
      })
      .catch(console.log);
  };
};

export const fetchAllUsers = () => {
  console.log('fetchAllUsers invoked');
  const access_token = localStorage.getItem('access_token');
  console.log(access_token);
  return dispatch => {
    axios({
      method: 'GET',
      url: '/users',
      headers: {
        access_token,
      },
    }).then(({ data }) => {
      dispatch(setLoadingAllUsers(false));
      dispatch(setAllUsers(data));
    });
  };
};
