import React, { useState } from "react";
import UserService from "../../services/User";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart, loginFailure } from "../../redux/userRedux";

const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState({ status: false, msg: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // onClick handle user login
  const handleLogin = async (e) => {
    // prevent button event behavior
    e.preventDefault();

    // validate empty form fields
    if (user.email === "") {
      setError({ status: true, msg: "Email field is empty." });
      return;
    }

    if (user.password === "") {
      setError({ status: true, msg: "Password field is empty." });
      return;
    }

    // perform lowercase function on email and password
    const email = user.email.toLowerCase();
    const password = user.password.toLowerCase();

    // start login process
    try {
      dispatch(loginStart());
      const res = await UserService.login(email, password);

      if (res.status === 200) {
        // set User in redux app store, move to homepage
        dispatch(loginSuccess(res.data));
        navigate("/home");
      } else {
        setError({ status: true, msg: "Failed to login." });
        dispatch(loginFailure());
      }
    } catch (error) {
      dispatch(loginFailure());
      setError({ status: true, msg: error.msg });
    }
  };

  // reset error msg, set onChange form input
  const handleChange = (e) => {
    e.preventDefault();
    setError({ status: false, msg: "" });
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
      {error && <p style={{ color: "red" }}>{error.msg}</p>}
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
