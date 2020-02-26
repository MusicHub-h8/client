import React, { useEffect, useState } from "react";
import UserCard from "../../../components/UserCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../store/actions";
import Dropdown from "react-bootstrap/Dropdown";
const Explore = () => {
  const allUsers = useSelector(state => state.userReducer.allUsers);
  const [result, setResult] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const searchByKeyword = keyword => {
    if (keyword.length > 0) {
      setIsSearching(true);
      if (keyword === "all") {
        setResult(allUsers);
      } else {
        const searchResult = allUsers.filter(user => {
          let isSuitable = false;
          user.instruments.forEach(instrument => {
            if (instrument.toLowerCase().startsWith(keyword.toLowerCase())) {
              isSuitable = true;
            }
          });
          if (isSuitable) return user;
        });
        searchResult.length > 0 ? setResult(searchResult) : setResult([]);
      }
    } else {
      setIsSearching(false);
    }
  };

  const [isSearching, setIsSearching] = useState(false);
  return (
    <>
      <div style={{ flexDirection: "row", width: "70%", marginBottom: "1rem" }}>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Filter By Instruments
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => searchByKeyword("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("guitar")}>
              Guitar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("bass")}>
              Bass
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("drum")}>
              Drum
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("piano")}>
              Piano
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("keyboard")}>
              Keyboard
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("vocal")}>
              Vocal
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("violin")}>
              Violin
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("acapella")}>
              Acapella
            </Dropdown.Item>
            <Dropdown.Item onClick={() => searchByKeyword("saxophone")}>
              Saxophone
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {!isSearching &&
        allUsers.map(player => <UserCard key={player._id} player={player} />)}
      {isSearching &&
        result.map(player => <UserCard key={player._id} player={player} />)}
    </>
  );
};

export default Explore;
