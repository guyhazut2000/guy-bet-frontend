import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutStart, logoutSuccess } from "../../redux/userRedux";

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
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-start col">
        <Link className="navbar-brand d-none d-lg-flex" href="/">
          Hazut Bet
        </Link>

        <div className="navbar-nav d-flex flex-row gap-3  ">
          <Link className="nav-item nav-link " to={"/home"}>
            Home
          </Link>
          <Link className="nav-item nav-link " to={"/my-bets"}>
            My Bets
          </Link>
          <Link className="nav-item nav-link " to={"/score-table"}>
            Score Table
          </Link>
        </div>
      </div>
      <button className="btn btn-danger fixed-right m-3 " onClick={handleClick}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
