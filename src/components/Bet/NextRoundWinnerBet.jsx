import React, { useEffect, useState } from "react";
import { getTeamImage } from "../../utils/TeamImage";

const NextRoundWinnerBet = ({
  firstTeamName,
  secondTeamName,
  prediction,
  score,
  status,
}) => {
  const [firstTeamImage, setFirstTeamImage] = useState();
  const [secondTeamImage, setSecondTeamImage] = useState();

  // get teams images src
  useEffect(() => {
    setFirstTeamImage(getTeamImage(firstTeamName));
    setSecondTeamImage(getTeamImage(secondTeamName));
  }, []);

  return (
    <div className="row m-2 p-2 ">
      <h4 className="mb-3 text-center">Next Round Winner</h4>
      <img
        src={firstTeamImage}
        className="card-img-top img-responsive col"
        alt="Team Logo"
        style={{ height: "4rem", width: "4rem" }}
      />
      <p className="col"></p>
      <img
        src={secondTeamImage}
        className="card-img-top img-responsive col"
        alt="Team Logo"
        style={{ height: "4rem", width: "4rem" }}
      />
      <div className="mt-2 card-body">
        <div className="row card-title">
          <b className="col text-center"> {firstTeamName}</b>
          <div className="col text-center">vs</div>
          <b className="col text-center"> {secondTeamName}</b>
        </div>
        <div className="my-3 mb-5 d-flex flex-row gap-2 ">
          <b className="align-self-center">Prediction - </b>
          <img
            src={prediction === "1" ? firstTeamImage : secondTeamImage}
            className="card-img-top"
            alt="Team Logo"
            style={{ height: "5rem", width: "5rem" }}
          />
        </div>
        <b
          className="card-text text-center m-auto"
          style={{ color: score > 0 ? "green" : "red" }}
        >
          Status - {status}
        </b>
        <p></p>
        <b
          className="card-text text-center m-auto"
          style={{ color: score > 0 ? "green" : "red" }}
        >
          Score - {status === "live" ? "TBA" : score}
        </b>
      </div>
    </div>
  );
};

export default NextRoundWinnerBet;
