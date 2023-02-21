import React from "react";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TableScore from "./pages/TableScore";
import Bets from "./pages/Bets";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      {user ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-bets" element={<Bets />} />
        <Route path="/score-table" element={<TableScore />} />
      </Routes>
    </Router>
  );
};

export default App;
