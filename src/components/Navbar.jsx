import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutStart, logoutSuccess } from "../redux/userRedux";

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutStart());
    dispatch(logoutSuccess(user));
    navigate("/login");
  };

  return (
    <div>
      <h1>Hazut Bet</h1>
      <div>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/my-bets">My Bets</a>
          </li>
          <li>
            <a href="/score-table">Score Table</a>
          </li>
        </ul>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
