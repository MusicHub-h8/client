import React from "react";
import UserCard from "../../../components/UserCard";

const Explore = () => {
  const arr = [
    {
      _id: 1,
      display_name: "dmtrxw",
      avatar:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d94682f8-fdc9-492d-86c4-844e5ba55c4e/d1hisi9-085f9f5e-9c01-49af-bb7e-33d8af59cba7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5NDY4MmY4LWZkYzktNDkyZC04NmM0LTg0NGU1YmE1NWM0ZVwvZDFoaXNpOS0wODVmOWY1ZS05YzAxLTQ5YWYtYmI3ZS0zM2Q4YWY1OWNiYTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1vE7epA7X2gKadNmh56v0m8_RZxkRE3sEqBAsbB2DDU",
      genre: "Rock",
      instruments: ["Guitar", "Drum"]
    },
    {
      _id: 2,
      display_name: "Gaben",
      avatar:
        "https://cdn2.iconfinder.com/data/icons/many-people-flat-icons/128/speaker-512.png",
      genre: "Jazz",
      instruments: ["Bass", "Guitar"]
    },
    {
      _id: 3,
      display_name: "Bania",
      avatar:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d94682f8-fdc9-492d-86c4-844e5ba55c4e/d1hisi9-085f9f5e-9c01-49af-bb7e-33d8af59cba7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5NDY4MmY4LWZkYzktNDkyZC04NmM0LTg0NGU1YmE1NWM0ZVwvZDFoaXNpOS0wODVmOWY1ZS05YzAxLTQ5YWYtYmI3ZS0zM2Q4YWY1OWNiYTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1vE7epA7X2gKadNmh56v0m8_RZxkRE3sEqBAsbB2DDU",
      genre: "Jazz",
      instruments: ["Piano"]
    },
    {
      _id: 4,
      display_name: "Jelang",
      avatar:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d94682f8-fdc9-492d-86c4-844e5ba55c4e/d1hisi9-085f9f5e-9c01-49af-bb7e-33d8af59cba7.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q5NDY4MmY4LWZkYzktNDkyZC04NmM0LTg0NGU1YmE1NWM0ZVwvZDFoaXNpOS0wODVmOWY1ZS05YzAxLTQ5YWYtYmI3ZS0zM2Q4YWY1OWNiYTcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.1vE7epA7X2gKadNmh56v0m8_RZxkRE3sEqBAsbB2DDU",
      genre: "Rock",
      instruments: ["Guitar"]
    },
    {
      _id: 5,
      display_name: "Iban",
      avatar:
        "https://cdn2.iconfinder.com/data/icons/many-people-flat-icons/128/speaker-512.png",
      genre: "Pop",
      instruments: ["Vocal"]
    }
  ];
  return arr.map(player => <UserCard key={player._id} player={player} />);
};

export default Explore;
