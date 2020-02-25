import React, { useEffect, useState } from "react";
import UserCard from "../../../components/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/actions";

const Explore = () => {
  const allUsers = useSelector(state => state.userReducer.allUsers);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const searchByKeyword = keyword => {
    const searchResult = allUsers.filter(user => {
      let isSuitable = false;
      user.instruments.forEach(instrument => {
        if (instrument.toLowerCase().startsWith(keyword.toLowerCase())) {
          isSuitable = true;
        }
      });
      if (isSuitable) return user;
    });
    searchResult.length > 0 ? setResult(searchResult) : setResult(allUsers);
  };

  return (
    <div style={{ flexDirection: "row", width: "50rem" }}>
      {result.length === 0 &&
        allUsers.map(player => <UserCard key={player._id} player={player} />)}
      {result.length > 0 &&
        result.map(player => <UserCard key={player._id} player={player} />)}
    </div>
  );
};

export default Explore;
