import React from 'react';
import axios from '../api/axiosInstance';
import SpotifyLogin from 'react-spotify-login';
import { Link } from 'react-router-dom';

const Home = () => {
  const onSuccess = response => {
    axios
      .post(
        '/users/login',
        {},
        {
          headers: {
            spotify_token: response.access_token,
          },
        }
      )
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token);
      })
      .catch(console.log);
  };
  const onFailure = response => console.error(response);

  return (
    <div>
      <h1>MusicHub</h1>
      <Link to='/dashboard'>Dashboard</Link>
      <SpotifyLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        redirectUri={process.env.REACT_APP_REDIRECT_URI}
        onSuccess={onSuccess}
        onFailure={onFailure}
        className='btn-spotify'
      />
    </div>
  );
};

export default Home;
