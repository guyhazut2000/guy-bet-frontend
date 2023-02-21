import React, { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <div className="loginContainer">
      <h1>Login Form</h1>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account ?
        <span>
          <a href="/register">
            <b>Register</b>
          </a>
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
