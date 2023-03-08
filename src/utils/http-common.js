import axios from "axios";

export default axios.create({
  baseURL:
    // process.env.NODE_ENV === "production"
    //   ? "https://guy-bet-api.onrender.com/api/v1"
    "https://guy-bet-api.onrender.com/api/v1",
  // "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
