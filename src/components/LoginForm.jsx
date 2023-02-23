import React, { useState } from "react";
import UserService from "../services/User";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailure } from "../redux/userRedux";

const LoginForm = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await UserService.login(user.email, user.password);
      // check response status
      if (res.status === 200) {
        // check if user exists in db
        if (res.data.user !== null) {
          // set currentUser in redux store
          const currentUser = res.data.user;
          dispatch(loginSuccess(currentUser));
          navigate("/home");
        } else {
          dispatch(loginFailure());
        }
      }
    } catch (error) {
      dispatch(loginFailure());
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className="container d-flex flex-column gap-3 my-5">
      <h1 className="text-center "> Login </h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          className="form-control"
          type="text"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="text"
          id="password"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account ?
        <span>
          <Link to={"/register"}>
            <b>Register</b>
          </Link>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
