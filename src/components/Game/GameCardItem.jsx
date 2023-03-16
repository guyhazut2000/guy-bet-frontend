import React, { useEffect, useState } from "react";
import { getTeamImage } from "../../utils/TeamImage";
import GameService from "../../services/Game";
import BetService from "../../services/Bet";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const GameCardItem = ({ game }) => {
  const user = useSelector((state) => state.user.currentUser);

  const [homeTeamImage, setHomeTeamImage] = useState();
  const [awayTeamImage, setAwayTeamImage] = useState();

  const [newBet, setNewBet] = useState({
    userId: user._id,
    gameId: game._id,
    type: "match_up",
  });

  // get teams images src
  useEffect(() => {
    setHomeTeamImage(getTeamImage(game.homeTeamName));
    setAwayTeamImage(getTeamImage(game.awayTeamName));
  }, []);

  // create new bet
  const handleClick = async (event) => {
    event.preventDefault();

    const res = await GameService.getGameById(game._id);

    const MS_PER_MINUTE = 60000;
    const durationInMinutes = 15 * MS_PER_MINUTE;

    // compare dates
    const currentTime = new Date(Date.now() + durationInMinutes);
    let gameDate = new Date(res.data.date);

    // create new bet if 'current time + 15' is smaller then 'game time'.
    if (currentTime < gameDate) {
      let homeTeamScore = parseInt(newBet.homeTeamScore);
      let awayTeamScore = parseInt(newBet.awayTeamScore);
      let prediction =
        homeTeamScore > awayTeamScore
          ? "1"
          : homeTeamScore < awayTeamScore
          ? "2"
          : "x";

      const res = await BetService.create({
        ...newBet,
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        prediction,
      });

      if (res.data) {
        Swal.fire("Success", "Bet created successfully!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("bet failed");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewBet({ ...newBet, [e.target.id]: e.target.value });
  };

  return (
    <div className="card p-2 m-auto m-sm-2 " style={{ width: "18rem" }}>
      <div className="row m-2 p-2 align-content-center">
        <h6 className="text-center">Match Up</h6>
        <img
          src={homeTeamImage}
          className="card-img-top img-responsive col"
          alt="Team Logo"
          style={{ height: "36px", width: "36px" }}
        />
        <p className="col"></p>
        <img
          src={awayTeamImage}
          className="card-img-top img-responsive col"
          alt="Team Logo"
          style={{ height: "36px", width: "36px" }}
        />
        <div className="card-body">
          <div className="row card-title">
            <div className="col text-center">
              {" "}
              <b>{game.homeTeamName}</b>
            </div>
            <div className="col text-center">vs</div>
            <div className="col text-center">
              {" "}
              <b>{game.awayTeamName}</b>
            </div>
          </div>
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              {game?.homeTeamName}
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            id="homeTeamScore"
            onChange={handleChange}
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              {game?.awayTeamName}
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            id="awayTeamScore"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-success w-100 mx-auto" onClick={handleClick}>
          Submit Bet
        </button>
      </div>
    </div>
  );
};

export default GameCardItem;
