import React, { useEffect } from "react";
import UserCard from "../../../components/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/actions";
const Explore = () => {
  const allUsers = useSelector(state => state.userReducer.allUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  return allUsers.map(player => <UserCard key={player._id} player={player} />);
};

export default Explore;
