import React, { useEffect, useState } from "react";
import { getTeamImage } from "../../utils/TeamImage";

const TournamentWinnerBet = ({ teamName, score, status }) => {
  const [teamNameImage, setTeamNameImage] = useState(teamName);

  // get teams images src
  useEffect(() => {
    setTeamNameImage(getTeamImage(teamNameImage));
  }, []);

  return (
    <div className="d-flex flex-column">
      <h4 className="mb-4 text-center">Tournament Winner Team</h4>
      <p className="mx-2 gap-2 d-flex mb-2">
        <b>prediction - </b> {teamName}
      </p>
      <img
        src={teamNameImage}
        className="my-4 card-img-top align-self-center"
        alt="Team Logo"
        style={{ height: "10rem", width: "10rem" }}
      />
      <div
        style={{
          color: status === "live" ? "black" : score > 0 ? "green" : "red",
        }}
      >
        <p>
          <b>Status</b> - {status}
        </p>
        <p>
          <b>Score</b> - {status === "live" ? "TBA" : score}
        </p>
      </div>
    </div>
  );
};

export default TournamentWinnerBet;
