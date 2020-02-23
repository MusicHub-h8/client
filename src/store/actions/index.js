import axios from '../../api/axiosInstance';

export const GET_MYROOMS = 'GET_MYROOMS';
export const ADD_ROOM = 'ADD_ROOM';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_RECOMMENDED_USERS = 'SET_RECOMMENDED_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const DELETE_INVITE = 'DELETE_INVITES';

// request => hit server
// recieve => dispatch reducer

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
        dispatch(setLoading(false));
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

export const setLoading = value => {
  return {
    type: SET_LOADING,
    payload: value,
  };
};

export const setError = err => {
  return {
    type: SET_ERROR,
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
        dispatch(setLoading(false));
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
        dispatch(setLoading(false));
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
        dispatch(requestRooms);
        console.log(data, 'dari requestAcceptInvitation');
      })
      .catch(console.log);
  };
};
