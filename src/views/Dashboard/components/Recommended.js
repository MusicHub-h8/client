import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestRecommendedUsers, setLoading } from "../../../store/actions";
import "./styles.css";
import UserCard from "../../../components/UserCard";
import Dropdown from "react-bootstrap/Dropdown";
const Recommended = () => {
  const dispatch = useDispatch();
  const recommendedUsers = useSelector(
    state => state.userReducer.recommendedUsers
  );
  const [result, setResult] = useState([]);

  const searchByKeyword = keyword => {
    if (keyword.length > 0) {
      setIsSearching(true);
      if (keyword === "all") {
        setResult(recommendedUsers);
      } else {
        const searchResult = recommendedUsers.filter(user => {
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

  const loading = useSelector(state => state.roomReducer.loading);
  const error = useSelector(state => state.roomReducer.error);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(requestRecommendedUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5">Error...</p>;
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
        recommendedUsers.map(player => (
          <UserCard key={player._id} player={player} />
        ))}
      {isSearching &&
        result.map(player => <UserCard key={player._id} player={player} />)}
    </>
  );
};

export default Recommended;
