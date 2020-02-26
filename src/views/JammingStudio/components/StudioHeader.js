import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FormAdd from "./FormAdd";

export default function StudioHeader(props) {
  const [showForm, setShowForm] = useState(false);
  // const roomOwner = props.roomDetail.roomOwner;
  const players = props.roomDetail.userIds;
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/dashboard/studios");
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    console.log(players);
  }, [players]);
  return (
    <>
      <div className="studio-HeaderContainer text-white">
        <div className="studio-heading">
          <div className="leftSide">
            <i
              style={{ width: "2rem" }}
              className="faBtn fas fa-2x fa-chevron-left"
              onClick={() => {
                handleGoBack();
              }}
            ></i>
            <button
              className="dash-add-btn"
              onClick={event => {
                toggleForm();
              }}
            >
              <i class="fas fa-plus"></i> Add Track
            </button>
          </div>
          <div className="rightSide">
            <div className="playerAvaContainer">
              {players &&
                players.map(player => (
                  <img
                    src={player.avatar}
                    alt={player.display_name}
                    className="playerAva"
                  />
                ))}
              {/* {roomOwner && (
                <img
                  src={roomOwner.avatar}
                  alt={roomOwner.display_name}
                  className="playerAva"
                />
              )} */}
              {props.roomDetail.roomOwner && (
                <img
                  src={props.roomDetail.roomOwner.avatar}
                  alt={props.roomDetail.roomOwner.display_name}
                  className="playerAva"
                />
              )}
            </div>
          </div>
        </div>
        {showForm && <FormAdd />}
      </div>
    </>
  );
}
