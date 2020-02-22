import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestRooms, setLoading } from '../../../store/actions';
import StudioCard from '../components/StudioCard';

const MyStudio = () => {
  const dispatch = useDispatch();
  const myRooms = useSelector(state => state.roomReducer.myRooms);
  const loading = useSelector(state => state.roomReducer.loading);
  const error = useSelector(state => state.roomReducer.error);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(requestRooms());
  }, [dispatch]);

  if (loading) return <p className='text-center mt-5'>Loading...</p>;
  if (error) return <p className='text-center mt-5'>Error...</p>;
  return myRooms.owned.map(studio => (
    <StudioCard key={studio._id} studio={studio} />
  ));
};

export default MyStudio;
