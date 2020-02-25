import React, { useState } from "react";

export default function Searchbar(props) {
  const [keyword, setKeyword] = useState("");

  const handleChange = event => {
    setKeyword(event.target.value);
    props.searchByRoomTitle(event.target.value);
  };

  return (
    <div>
      <form>
        <input
          type="search"
          value={keyword}
          style={{ borderRadius: 6, width: "15rem" }}
          onChange={event => handleChange(event)}
          name="search"
          placeholder="Search by room title"
        ></input>
      </form>
    </div>
  );
}
