import React, { useEffect, useState } from "react";
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

const Bet = ({
  homeTeamName,
  awayTeamName,
  homeTeamScore,
  awayTeamScore,
  score,
}) => {
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
    const homeName = getTeamImageName(homeTeamName);
    setHomeTeamImage(homeName);
    const awayName = getTeamImageName(awayTeamName);
    setAwayTeamImage(awayName);
  }, []);

  return (
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
            <b>{homeTeamName}</b>
          </div>
          <div className="col text-center">vs</div>
          <div className="col text-center">
            {" "}
            <b>{awayTeamName}</b>
          </div>
        </div>
        <div className="row">
          <p className="text-center">
            Bet Prediction <span> </span>
            {homeTeamScore} - {awayTeamScore}
          </p>
        </div>
        <p className="card-text text-center my-0 py-0">Score - {score}</p>
      </div>
    </div>
  );
};

export default Bet;
