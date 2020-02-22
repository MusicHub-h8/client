import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosInstance';

const MyStudio = () => {
  const [studios, setStudios] = useState([]);
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/rooms',
    });
  }, []);
  return arr.map(player => <UserCard key={player._id} player={player} />);
};

export default MyStudio;
