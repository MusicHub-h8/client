import axios from '../../api/axiosInstance'

export const GET_MYROOMS = 'GET_MYROOMS'
export const GET_TRACKS = 'GET_TRACKS'
export const GET_ROOMDETAILS = 'GET_ROOMDETAILS'
// request => hit server
// recieve => dispatch reducer

export const requestRoom = () => {
  return null
}

export const requestRoomDetail = (roomId) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `/rooms/${roomId}`,
      headers: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTUxMGUyYjRlNjY1NjcwMTYzMTU1YjkiLCJpYXQiOjE1ODIzNzU4OTN9.8WsGa9GOQIYObwB2phPuPhfqmnY_8MWeEEe8sJuXN2o',
      },
    })
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }
}

export const requestTracks = () => {
  axios({})
}
