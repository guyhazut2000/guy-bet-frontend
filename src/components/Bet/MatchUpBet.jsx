import React, { useEffect, useState } from "react";
import { getTeamImage } from "../../utils/TeamImage";
import BetService from "../../services/Bet";
import Swal from "sweetalert2";
import GameService from "../../services/Game";

const MatchUpBet = ({
  homeTeamName,
  awayTeamName,
  homeTeamScore,
  awayTeamScore,
  score,
  status,
  gameId,
  betId,
}) => {
  const [homeTeamImage, setHomeTeamImage] = useState();
  const [awayTeamImage, setAwayTeamImage] = useState();

  const [newBet, setNewBet] = useState({
    betId,
    type: "match_up",
    homeTeamScore,
    awayTeamScore,
  });

  // get teams images src
  useEffect(() => {
    setHomeTeamImage(getTeamImage(homeTeamName));
    setAwayTeamImage(getTeamImage(awayTeamName));
  }, []);

  // Update bet
  const handleClick = async (event) => {
    event.preventDefault();

    const game = await GameService.getGameById(gameId);

    const MS_PER_MINUTE = 60000;
    const durationInMinutes = 15 * MS_PER_MINUTE;

    // compare dates
    const currentTime = new Date(Date.now() + durationInMinutes);
    let gameDate = new Date(game.data.date);

    // Update bet if 'current time + 15' is smaller then 'game time'.
    if (currentTime > gameDate) {
      return;
    }

    let homeScore = parseInt(newBet.homeTeamScore);
    let awayScore = parseInt(newBet.awayTeamScore);
    let prediction =
      homeScore > awayScore ? "1" : homeScore < awayScore ? "2" : "x";

    const res = await BetService.update({
      ...newBet,
      prediction,
    });

    if (res.data) {
      Swal.fire("Success", "Bet Updated successfully!", "success");
    } else {
      console.log("Failed to update bet.");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewBet({ ...newBet, [e.target.id]: e.target.value });
  };

  return (
    <div className="d-flex flex-column justify-content-around align-content-around">
      <h4 className="card-title text-center">Match Up</h4>
      <div className="mt-2 d-flex flex-column gap-2">
        <div className="d-flex justify-content-around align-content-around  text-center">
          <b className="col-5">{homeTeamName}</b>
          <p className="col-2">vs</p>
          <b className="col-5">{awayTeamName}</b>
        </div>
        <div className="mt-1 d-flex justify-content-around align-content-around">
          <img
            src={homeTeamImage}
            alt="Team a Logo"
            style={{ height: "4rem", width: "4rem" }}
          />
          <img
            src={awayTeamImage}
            alt="Team b Logo"
            style={{ height: "4rem", width: "4rem" }}
          />
        </div>
      </div>

      <div className="card-body">
        <p className="mt-1 card-text">
          <b>Prediction:</b>
        </p>
        <div className="gap-2 d-flex flex-row">
          <p className="">{homeTeamName + " - " + homeTeamScore}</p>
          <p className="">{awayTeamName + " - " + awayTeamScore}</p>
        </div>
        {status !== "live" ? (
          <div
            className="mt-4"
            style={{ color: status === "won" ? "green" : "red" }}
          >
            <b>Status - {status}</b>
            <p></p>
            <b
              className="card-text mt-3"
              style={{ color: score > 0 ? "green" : "red" }}
            >
              Score - {score}
            </b>
          </div>
        ) : (
          <div>
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  {homeTeamName}
                </span>
              </div>
              <input
                placeholder={homeTeamScore}
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
                  {awayTeamName}
                </span>
              </div>
              <input
                placeholder={awayTeamScore}
                type="number"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                id="awayTeamScore"
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success w-100 " onClick={handleClick}>
              Update Bet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchUpBet;
