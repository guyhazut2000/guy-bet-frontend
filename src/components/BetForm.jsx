import React, { useEffect, useState } from "react";
import BetService from "../services/Bet";
import MatchService from "../services/Match";
import {
  Milan,
  Bayern,
  RealMadrid,
  Benfica,
  Chelsea,
  ClubBrugge,
  Dortmund,
  Paris,
  Tottenham,
  EintrachtFrankfurt,
  Leipzig,
  Inter,
  Liverpool,
  Napoli,
  ManchesterCity,
  Porto,
} from "../images/index";

const BetForm = ({ userId, matchId, bet }) => {
  const [newBet, setNewBet] = useState({ userId, matchId });

  const handleClick = async (event) => {
    event.preventDefault();
    const currentTime = new Date();
    const res = await MatchService.getMatchById(matchId);
    const matchTime = res.data.match.date;
    let matchDate = new Date(matchTime);
    if (currentTime < matchDate) {
      const res = await BetService.create({
        ...newBet,
        homeTeamName: bet.homeTeamName,
        awayTeamName: bet.awayTeamName,
      });
      if (res.data) {
        window.location.reload();
      } else {
        console.log("bet failed");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewBet({ ...newBet, [e.target.id]: e.target.value });
  };

  const [homeTeamImage, setHomeTeamImage] = useState();
  const [awayTeamImage, setAwayTeamImage] = useState();

  const getTeamImageName = (name) => {
    switch (name) {
      case "milan":
        return Milan;
      case "bayern":
        return Bayern;
      case "real madrid":
        return RealMadrid;
      case "benfica":
        return Benfica;
      case "chelsea":
        return Chelsea;
      case "club brugge":
        return ClubBrugge;
      case "dortmund":
        return Dortmund;
      case "paris":
        return Paris;
      case "tottenham":
        return Tottenham;
      case "eintracht frankfurt":
        return EintrachtFrankfurt;
      case "leipzig":
        return Leipzig;
      case "inter":
        return Inter;
      case "liverpool":
        return Liverpool;
      case "napoli":
        return Napoli;
      case "manchester city":
        return ManchesterCity;
      case "porto":
        return Porto;

      default:
        return null;
    }
  };

  useEffect(() => {
    const homeName = getTeamImageName(bet?.homeTeamName);
    setHomeTeamImage(homeName);
    const awayName = getTeamImageName(bet?.awayTeamName);
    setAwayTeamImage(awayName);
  }, []);

  return (
    // <div>
    //   <p>
    //     {bet?.homeTeamName} vs {bet?.awayTeamName}
    //   </p>
    //   <label htmlFor="homeTeam">Home </label>
    //   <input type="number" id="homeTeamScore" onChange={handleChange} />
    //   <label htmlFor="awayTeam">Away </label>
    //   <input type="number" id="awayTeamScore" onChange={handleChange} />
    //   <button onClick={handleClick}>Submit</button>
    //   <br />
    // </div>

    <div className="card p-2 m-auto m-sm-2 " style={{ width: "18rem" }}>
      <div className="row m-2 p-2 align-items-center">
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
      </div>
      <div className="card-body">
        <div className="row card-title">
          <div className="col text-center">
            {" "}
            <b>{bet?.homeTeamName}</b>
          </div>
          <div className="col text-center">vs</div>
          <div className="col text-center">
            {" "}
            <b>{bet?.awayTeamName}</b>
          </div>
        </div>
        <div className="row p-2">
          <p className="text-center pt-3 pb-2">
            <b>Prediction</b>
          </p>
        </div>
        {/* <label htmlFor="homeTeam">Home </label>
        <input type="number" id="homeTeamScore" onChange={handleChange} />
        <label htmlFor="awayTeam">Away </label>
        <input type="number" id="awayTeamScore" onChange={handleChange} />
        <button onClick={handleClick}>Submit</button> */}
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              {bet?.homeTeamName}
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              {bet?.awayTeamName}
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
        <button className="btn btn-success w-100 mx-auto" onClick={handleClick}>
          Submit Bet
        </button>
      </div>
    </div>
  );
};

export default BetForm;
