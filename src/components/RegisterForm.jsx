import React, { useState } from "react";
import UserService from "../services/User";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await UserService.register(
        user.email,
        user.password,
        user.firstName,
        user.lastName
      );
      // check if user created successfully then navigate to login page
      if (res.status === 201) {
        navigate("/login");
      }
      // if failed to create new user display error message.
      if (res.status === 200) {
        console.log("error", res.data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className="loginContainer">
      <h1>Register Form</h1>
      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" onChange={handleChange} />
      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" onChange={handleChange} />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" onChange={handleChange} />
      <button onClick={handleLogin}>Register</button>
      <p>
        Already have an account ?
        <span>
          <a href="/login">
            <b>Login</b>
          </a>
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
