import React from 'react';
import axios from '../../api/axiosInstance';
import { useHistory } from 'react-router-dom';
import SpotifyLogin from '../../components/SpotifyLogin';
import './components/styles.css';

const Home = () => {
  const history = useHistory();

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
        history.push('/dashboard');
      })
      .catch(console.log);
  };
  const onFailure = response => console.error(response);

  const goToDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <>
      <main className='home-container'>
        <h1 className='logo text-lobster'>MusicHub</h1>
        <h3 className='text-lobster home-sub-head'>
          Finding jamming buddies never been easier
        </h3>
        <SpotifyLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          redirectUri={process.env.REACT_APP_REDIRECT_URI}
          onSuccess={onSuccess}
          onFailure={onFailure}
          className='home-btn-spotify'
        />
        <button onClick={goToDashboard}>dashboard</button>
      </main>
    </>
  );
};

export default Home;
