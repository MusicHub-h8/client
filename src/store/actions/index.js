import axios from "../../api/axiosInstance";

export const GET_MYROOMS = "GET_MYROOMS";
export const ADD_ROOM = "ADD_ROOM";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const GET_TRACKS = "GET_TRACKS";
export const GET_ROOMDETAILS = "GET_ROOMDETAILS";
export const SET_RECOMMENDED_USERS = "SET_RECOMMENDED_USERS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const DELETE_INVITE = "DELETE_INVITES";
export const SET_ALL_USERS = "SET_ALL_USERS";
export const DELETE_TRACK = "DELETE_TRACK";
export const ADD_TRACK = "ADD_TRACK";

// request => hit server
// recieve => dispatch reducer

export const requestAddTrack = trackInfo => {
  const access_token = localStorage.getItem("access_token");
  const { instrument, selectedFile, roomId } = trackInfo;
  return dispatch => {
    const url = `/tracks/${roomId}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        access_token
      }
    };
    let formData = new FormData();
    formData.append("instrument", instrument);
    formData.append("track", selectedFile);
    console.log(formData);
    axios
      .post(url, formData, config)
      .then(({ data }) => {
        console.log("sukses upload!");
        dispatch(addTrack(data));
      })
      .catch(err => {
        console.log("---------------------------------");
        console.log(err.response);
      });
  };
};

export const addTrack = trackDetail => {
  return {
    type: ADD_TRACK,
    payload: trackDetail
  };
};
export const removeTrack = deletedTrackId => {
  return {
    type: DELETE_TRACK,
    payload: deletedTrackId
  };
};
export const requestDeleteTrack = trackId => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "DELETE",
      url: `/tracks/${trackId}`,
      headers: {
        access_token
      }
    })
      .then(() => {
        console.log("hit disiniii");
        dispatch(removeTrack(trackId));
      })
      .catch(console.log);
  };
};
export const setActiveRoom = roomDetail => {
  return {
    type: GET_ROOMDETAILS,
    payload: roomDetail
  };
};

export const setAllUsers = users => {
  return {
    type: SET_ALL_USERS,
    payload: users
  };
};
export const requestRoomDetail = roomId => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "GET",
      url: `/rooms/${roomId}`,
      headers: {
        access_token
      }
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
    payload: rooms
  };
};

export const requestRooms = () => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "GET",
      url: "/rooms/me",
      headers: {
        access_token
      }
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
    payload: room
  };
};

export const requestAddRoom = room => {
  const { music_title, description, access_token } = room;
  return dispatch => {
    axios({
      method: "POST",
      url: "/rooms",
      data: {
        music_title,
        description
      },
      headers: {
        access_token
      }
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
    payload: value
  };
};

export const setError = err => {
  return {
    type: SET_ERROR,
    payload: err
  };
};

export const setRecommendedUsers = recommendedUsers => {
  return {
    type: SET_RECOMMENDED_USERS,
    payload: recommendedUsers
  };
};

export const requestRecommendedUsers = () => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "GET",
      url: "/users/recommendations",
      headers: {
        access_token
      }
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
    payload: currentUser
  };
};

export const requestCurrentUser = () => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "GET",
      url: "/users/me",
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        console.log(data, "dataneh");
        dispatch(setLoading(false));
        dispatch(setCurrentUser(data));
      })
      .catch(console.log);
  };
};

export const deleteInvite = roomId => {
  return {
    type: DELETE_INVITE,
    payload: roomId
  };
};

export const requestAcceptInvitation = (roomId, userId) => {
  const access_token = localStorage.getItem("access_token");
  return dispatch => {
    axios({
      method: "PATCH",
      url: `/rooms/${roomId}/invite/${userId}`,
      headers: {
        access_token
      }
    })
      .then(({ data }) => {
        dispatch(deleteInvite(roomId));
        dispatch(requestRooms);
        console.log(data, "dari requestAcceptInvitation");
      })
      .catch(console.log);
  };
};

export const fetchAllUsers = () => {
  console.log("fetchAllUsers invoked");
  const access_token = localStorage.getItem("access_token");
  console.log(access_token);
  return dispatch => {
    axios({
      method: "GET",
      url: "/users",
      headers: {
        access_token
      }
    }).then(({ data }) => {
      dispatch(setLoading(false));
      dispatch(setAllUsers(data));
    });
  };
};
