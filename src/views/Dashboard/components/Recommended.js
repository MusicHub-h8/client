import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestRecommendedUsers, setLoading } from '../../../store/actions';
import './styles.css';
import UserCard from '../../../components/UserCard';

const Recommended = () => {
  const dispatch = useDispatch();
  const recommendedUsers = useSelector(
    state => state.userReducer.recommendedUsers
  );
  console.log(recommendedUsers, 'dari recommended.js');
  // const arr = [
  //   {
  //     _id: 1,
  //     name: 'Ivan',
  //     avatar:
  //       'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d94682f8-fdc9-492d-86c4-844e5ba55c4e/d1hisi9-085f9f5e-9c01-49af-bb7e-33d8af59cba7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5NDY4MmY4LWZkYzktNDkyZC04NmM0LTg0NGU1YmE1NWM0ZVwvZDFoaXNpOS0wODVmOWY1ZS05YzAxLTQ5YWYtYmI3ZS0zM2Q4YWY1OWNiYTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1vE7epA7X2gKadNmh56v0m8_RZxkRE3sEqBAsbB2DDU',
  //     genre: 'Rock',
  //     instruments: ['Guitar'],
  //   },
  //   {
  //     _id: 2,
  //     name: 'Gaben',
  //     avatar:
  //       'https://cdn2.iconfinder.com/data/icons/many-people-flat-icons/128/speaker-512.png',
  //     genre: 'Rock',
  //     instruments: ['Bass', 'Guitar'],
  //   },
  // ];

  const loading = useSelector(state => state.roomReducer.loading);
  const error = useSelector(state => state.roomReducer.error);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(requestRecommendedUsers());
  }, [dispatch]);

  if (loading) return <p className='text-center mt-5'>Loading...</p>;
  if (error) return <p className='text-center mt-5'>Error...</p>;
  return recommendedUsers.map(player => (
    <UserCard key={player._id} player={player} />
  ));
};

export default Recommended;
