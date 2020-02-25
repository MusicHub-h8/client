import React from "react";
import { useDispatch } from "react-redux";
import { requestAcceptInvitation } from "../../../store/actions";

const NotificationCard = props => {
  const dispatch = useDispatch();
  const { music_title, _id: roomId } = props.pending;
  const { userId } = props;
  const handleAccept = () => {
    dispatch(requestAcceptInvitation(roomId, userId));
  };
  console.log(props);
  return (
    <div className="card-studio card-notification">
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{music_title}</p>
      <button onClick={() => handleAccept()} className="dash-add-btn">
        Accept
      </button>
    </div>
  );
};

export default NotificationCard;
