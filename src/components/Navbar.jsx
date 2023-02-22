import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/my-bets"}>My Bets</Link>
          </li>
          <li>
            <Link to={"/score-table"}>Score Table</Link>
          </li>
        </ul>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
